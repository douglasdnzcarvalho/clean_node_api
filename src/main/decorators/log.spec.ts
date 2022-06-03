import { ok } from '../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return ok(httpRequest.body)
      }
    }
    const controller = new ControllerStub()
    const handleSpy = jest.spyOn(controller, 'handle')
    const sut = new LogControllerDecorator(controller)
    const httpRequest: HttpRequest = {
      body: { name: 'Douglas' }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
