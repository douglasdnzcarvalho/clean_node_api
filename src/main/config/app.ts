import express, { Express } from 'express'
import setupSwagger from '@/main/config/swagger'
import setupStaticFiles from '@/main/config/static-files'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import { setupApolloServer } from '@/main/config/apollo-server'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}
