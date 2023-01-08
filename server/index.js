import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import createError, { HttpError } from 'http-errors'
import logger from './util/logger.js'
import cors from 'cors'
import helmet from 'helmet'
import bookRoutes from './routes/bookRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/books', bookRoutes)

app.use((req, _res, next) => {
  logger.info('Invalid route', { method: req.method, url: req.url })
  next(createError(404, 'Not found.'))
})

app.use((error, _req, res, _next) => {
  let statusCode = 500
  let message = 'Something went wrong.'

  if (error instanceof HttpError) {
    statusCode = error.statusCode
  }

  message = error?.message
  logger.info(message)

  res.status(statusCode).json({ message })
})

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@books-cluster.lskfzvg.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', false)
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(() => {
    (error) => console.log(error.message)
  })
