import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  // constructor () {
  //   // this.emailValidator = emailValidator
  // }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    } catch (error) {
      return serverError(error)
    }
  }
}
