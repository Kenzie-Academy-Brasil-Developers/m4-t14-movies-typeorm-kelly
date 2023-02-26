import { Router } from 'express'
import moviesControllers from '../controllers/movies.controllers'
import { validateDataMid, validateMovieExistsMid, validateNameAlreadyExistMid } from '../middlewares'
import {movieCreateSchema, movieUpdateSchema} from '../schemas/movies.schema'

const moviesRoutes: Router = Router()

moviesRoutes.get('', moviesControllers.read)
moviesRoutes.post('', validateDataMid(movieCreateSchema), validateNameAlreadyExistMid, moviesControllers.create)
moviesRoutes.delete('/:id', validateMovieExistsMid, moviesControllers.deleteMovie)
moviesRoutes.patch('/:id', validateDataMid(movieUpdateSchema), validateMovieExistsMid, validateNameAlreadyExistMid, moviesControllers.update)

export default moviesRoutes