import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const jwt = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountMongoRepository, hasher, jwt, accountMongoRepository)
  const validationComposite = makeLoginValidation()
  const controller = new LoginController(authentication, validationComposite)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
