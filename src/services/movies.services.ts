import { tMovie, tMovieReturn, tMoviesReadAllReturn, tMoviesReturn, tMovieUpdate } from "../interfaces"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { Repository } from "typeorm"
import { returnMovie, returnReadAllMovie } from "../schemas"

const read = async (page: any, perPage:any, order:any, sort:any): Promise<tMoviesReadAllReturn> => {
    const movieRepository: Repository<tMovieReturn> = AppDataSource.getRepository(Movie)  
    
    /* if (Number(page) > 0) {
        page = Number(page)
    } else {
        page = 1;
    }

    if (Number(perPage) > 0 && Number(perPage) <= 5) {
        perPage = Number(perPage)
    } else {
        perPage = 5;
    }
    if(!order){
        order = 'ASC'
    }
    if(order !== 'ASC' && order !== 'DESC'){
        order = 'ASC'
    }
    if(!sort) order = 'ASC'
    if(sort !== 'price' && sort !== 'duration'){ 
        sort = 'id'
    } else {
        sort = sort || 'id'
    } */
   
    if(!sort) order = 'ASC'
    page = parseInt(page) > 0 ? parseInt(page) : 1
    perPage = parseInt(perPage) > 0 && parseInt(perPage) <= 5 ? parseInt(perPage) : 5
    order = ['ASC', 'DESC'].includes(order) ? order : 'ASC'
    sort = ['price', 'duration', 'id'].includes(sort) ? sort : 'id'
    const movies = await movieRepository.find({
        skip: perPage*(page - 1),
        take: perPage,
        order:{ [sort]: order },
    })

    const totalDataMovies = await movieRepository.count()

    const allMoviesReturn: tMoviesReadAllReturn = {
        prevPage: page > 1 ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}` : null,
        nextPage:
            totalDataMovies > perPage * page
            ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}` : null,
        count: totalDataMovies,
        data: movies,
        
    }

    return returnReadAllMovie.parse(allMoviesReturn)
}

const create = async (movieData: tMovie): Promise<tMovieReturn> =>{
    const movieRepository: Repository<tMovie> = AppDataSource.getRepository(Movie)    
    const movie: tMovie = movieRepository.create(movieData)
    await movieRepository.save(movie)

    const newMovie = returnMovie.parse(movie)

    return newMovie
}

const deleteMovie = async (movieId:number): Promise<void> => {
    const movieRepository: Repository<tMovieReturn> = AppDataSource.getRepository(Movie)
    const movie = await  movieRepository.findOne({
        where:{
            id: movieId
        }
    }) 
    await movieRepository.remove(movie!)
}

const update = async (movieData:tMovieUpdate, movieId: number): Promise<tMovieReturn> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const previousMovieData = await movieRepository.findOneBy({
        id: movieId
    })
    const movieNewData = movieRepository.create({
        ...previousMovieData,
        ...movieData
    })
    await movieRepository.save(movieNewData)
    return returnMovie.parse(movieNewData)
}

export default { create, read, deleteMovie, update }