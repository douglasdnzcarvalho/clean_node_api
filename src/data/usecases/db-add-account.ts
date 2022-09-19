import { AddAccount } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { Hasher } from '../protocols/criptography/hasher'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (account != null) return null

    const hashedPassword = await this.hasher.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return newAccount
  }
}
