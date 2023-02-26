import { z } from 'zod'

const movieCreateSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().nullish(),
    duration: z.number().min(1, {message: "Number must be greater than 0"}),
    price: z.number().min(0).int()
})

const movieUpdateSchema = movieCreateSchema.partial()

const returnMovie = movieCreateSchema.extend({
    id: z.number()
})

const returnMovies = z.array(returnMovie)

const returnReadAllMovie = z.object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    count: z.number(),
    data: returnMovies
})

export {
    movieCreateSchema,
    returnMovie,
    returnMovies,
    movieUpdateSchema,
    returnReadAllMovie
}