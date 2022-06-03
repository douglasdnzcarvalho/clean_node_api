import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BCryptAdapter(12)
  const repository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, repository)
  const controller = new SignUpController(emailValidator, addAccount)

  return new LogControllerDecorator(controller)
}
