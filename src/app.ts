import 'express-async-errors'
import express, { Application } from 'express'
import handleError from './errors/handleError.error'
import moviesRoutes from './routers/movies.routes'

const app: Application = express()
app.use(express.json())

app.use('/movies', moviesRoutes)

app.use(handleError)

export default app