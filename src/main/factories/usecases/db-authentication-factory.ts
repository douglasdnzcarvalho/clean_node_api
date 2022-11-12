import { DbAuthentication } from '@/data/usecases/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { BCryptAdapter, JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const jwt = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, hasher, jwt, accountMongoRepository)
}
