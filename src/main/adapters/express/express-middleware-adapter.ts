import { Middleware } from '@/presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (expressRequest: Request, expressResponse: Response, next: NextFunction) => {
    const request = {
      accessToken: expressRequest.headers?.['x-access-token']
    }
    const httpResponse = await middleware.handle(request)

    if (httpResponse.statusCode === 200) {
      Object.assign(expressRequest, httpResponse.body)
      next()
    } else {
      expressResponse.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
