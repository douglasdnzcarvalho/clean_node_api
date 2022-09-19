import { Authentication } from '@/domain/usecases/authentication'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'
import { EncrypterSpy, LoadAccountByEmailRepositorySpy, mockHashComparer, mockUpdateAccessTokenRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositorySpy
  hashComparerStub: HashComparer
  encrypterStub: EncrypterSpy
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositorySpy()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = new EncrypterSpy()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(authenticationParams)

    expect(loadByEmailSpy).toHaveBeenCalledWith(authenticationParams.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthenticationParams())

    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub, loadAccountByEmailRepositoryStub } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(authenticationParams)

    expect(compareSpy).toHaveBeenCalledWith(authenticationParams.password, loadAccountByEmailRepositoryStub.result.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())

    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub, loadAccountByEmailRepositoryStub } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(authenticationParams)

    expect(generateSpy).toHaveBeenCalledWith(loadAccountByEmailRepositoryStub.result.id)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub, loadAccountByEmailRepositoryStub, encrypterStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())

    expect(updateAccessTokenSpy).toHaveBeenCalledWith(loadAccountByEmailRepositoryStub.result.id, encrypterStub.encryptedText)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())

    await expect(typeof accessToken).toBe('string')
  })
})
