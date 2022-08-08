import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { BCryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const jwt = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, hasher, jwt, accountMongoRepository)
}
