import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import AppError from "../errors/app.error";
import { tMovie, tMovieReturn } from "../interfaces";

const validateMovieExistsMid = async (req:Request, res: Response, next: NextFunction): Promise<void> => {
    const movieRepository: Repository<tMovieReturn> = AppDataSource.getRepository(Movie)
    const findMovie = await movieRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(!findMovie) throw new AppError('Movie not found', 404)

    return next()

}
export default validateMovieExistsMid