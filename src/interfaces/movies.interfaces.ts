import { movieCreateSchema, returnMovie, returnMovies, movieUpdateSchema, returnReadAllMovie } from '../schemas/movies.schema'
import { z } from 'zod'
import { DeepPartial } from 'typeorm'

type tMovie = z.infer<typeof movieCreateSchema>
type tMovieReturn = z.infer<typeof returnMovie>
type tMoviesReturn = z.infer<typeof returnMovies>
type tMovieUpdate = DeepPartial<typeof movieCreateSchema>

type tMoviesReadAllReturn = z.infer<typeof returnReadAllMovie>

export { tMovie, tMovieReturn, tMoviesReturn, tMovieUpdate, tMoviesReadAllReturn }
