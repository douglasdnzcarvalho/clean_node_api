import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (expressRequest: Request, expressResponse: Response) => {
    const httpRequest: HttpRequest = {
      body: expressRequest.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    expressResponse.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
