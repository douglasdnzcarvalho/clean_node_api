import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { makeSignUpValidation } from '@/main/factories/controllers/signup/signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignUpValidation()
  const controller = new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
