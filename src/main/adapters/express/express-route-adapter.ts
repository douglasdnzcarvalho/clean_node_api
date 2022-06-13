import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (expressRequest: Request, expressResponse: Response) => {
    const httpRequest: HttpRequest = {
      body: expressRequest.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      expressResponse.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      expressResponse.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  }
}
