import swaggerConfig from '@/main/openapi'
import { noCache } from '@/main/middlewares'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig))
}
