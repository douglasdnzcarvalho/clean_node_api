import { HttpRequest, Middleware } from '@/presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (expressRequest: Request, expressResponse: Response, next: NextFunction) => {
    const request: HttpRequest = {
      headers: {
        'access-token': (expressRequest.headers?.['x-access-token'] as string)
      }
    }
    const httpResponse = await middleware.handle(request)

    if (httpResponse.statusCode === 200) {
      if (httpResponse.body.accountId) expressRequest.accountId = httpResponse.body.accountId

      next()
    } else {
      expressResponse.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
