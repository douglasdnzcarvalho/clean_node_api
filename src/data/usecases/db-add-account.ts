import { AddAccount } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { Hasher } from '../protocols/criptography/hasher'
import { CheckAccountByEmailRepository } from '../protocols/db/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)

    if (exists) return false

    const hashedPassword = await this.hasher.hash(accountData.password)
    const accountCreated = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return accountCreated
  }
}
