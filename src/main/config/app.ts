import express, { Express } from 'express'
import setupSwagger from '@/main/config/swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
