import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import AppError from "../errors/app.error";
import { tMovieReturn } from "../interfaces";

const validateNameAlreadyExistMid = async (req:Request, res: Response, next: NextFunction) =>{
    
    const movieRepository: Repository<tMovieReturn> = AppDataSource.getRepository(Movie)
    if(req.body.name){
        const findMovieName = await movieRepository.findOneBy({
            name: req.body.name
        })
        if(findMovieName) throw new AppError('Movie already exists.', 409)
    }
    
    return next()
}

export default validateNameAlreadyExistMid