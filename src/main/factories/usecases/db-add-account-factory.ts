import { DbAddAccount } from '@/data/usecases/db-add-account'
import { AddAccount } from '@/domain/usecases/add-account'
import { BCryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const hasher = new BCryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountRepository, accountRepository)
}
