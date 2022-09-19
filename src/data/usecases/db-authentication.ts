import { Authentication } from '@/domain/usecases/authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { Encrypter } from '../protocols/criptography/encrypter'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (authentication: Authentication.Params): Promise<Authentication.Result | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account == null) return null

    const valid = await this.hashComparer.compare(authentication.password, account.password)

    if (!valid) return null

    const accessToken = await this.encrypter.encrypt(account.id)

    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

    return accessToken
  }
}
