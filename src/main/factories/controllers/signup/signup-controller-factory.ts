import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignUpValidation()
  const controller = new SignUpController(makeDbAddAccount(), validationComposite, makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
