import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import router from './routes'
import { logger } from './utils'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(morgan('combined'))

app.use(router)

process.on('uncaughtException', (error: Record<string, unknown>) => {
  logger.error('Uncaught Exception!')
  logger.error('App crashed!')
  logger.error(error)
})

app.listen(PORT)
logger.log(`App is running on ${PORT} 🚀`)
