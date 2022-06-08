import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const encrypter = new BCryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountRepository)
  const validationComposite = makeSignUpValidation()
  const controller = new SignUpController(addAccount, validationComposite)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
