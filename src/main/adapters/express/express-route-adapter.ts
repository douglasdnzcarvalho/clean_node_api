import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (expressRequest: Request, expressResponse: Response) => {
    const httpRequest: HttpRequest = {
      body: (expressRequest.body ?? { }),
      params: (expressRequest.params ?? { }),
      accountId: expressRequest.accountId
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      expressResponse.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      expressResponse.status(httpResponse.statusCode).json(httpResponse.body.message)
    }
  }
}
