import { Request, Response } from 'express'
import { tMovie, tMovieReturn, tMoviesReadAllReturn, tMoviesReturn } from '../interfaces'
import moviesServices from '../services/movies.services'

const read = async (req: Request, res: Response)  => {
    const {page, perPage, order, sort } = req.query

    const allMovies: tMoviesReadAllReturn = await moviesServices.read(page, perPage, order, sort)
    return res.status(200).json(allMovies)
}

const create = async (req: Request, res: Response)  => {

    const movieData: tMovieReturn = await moviesServices.create(req.body)

    return res.status(201).json(movieData)
}

const deleteMovie = async (req: Request, res: Response)  => {

   await moviesServices.deleteMovie(parseInt(req.params.id))

    return res.status(204).send()
}

const update = async (req: Request, res: Response)  => {

   const  updatedMovie = await moviesServices.update(req.body, parseInt(req.params.id))
 
    return res.status(200).json(updatedMovie)
 }

export default { create, read, deleteMovie, update }