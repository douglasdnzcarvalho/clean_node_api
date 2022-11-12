import { LoginController } from '@/presentation/controllers/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { makeLoginValidation } from '@/main/factories/controllers/login/login-validation-factory'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const controller = new LoginController(makeDbAuthentication(), validationComposite)
  return makeLogControllerDecorator(controller)
}
