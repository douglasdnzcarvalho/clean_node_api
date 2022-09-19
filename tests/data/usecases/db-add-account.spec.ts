import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { DbAddAccount } from '@/data/usecases/db-add-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { AddAccountRepositorySpy, HasherSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: HasherSpy
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = new HasherSpy()
  const addAccountRepositoryStub = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositorySpy()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(null)
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    loadAccountByEmailRepositoryStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(addAccountParams)
    expect(hashSpy).toHaveBeenCalledWith(addAccountParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, hasherStub } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(addAccountParams)
    expect(addSpy).toHaveBeenCalledWith({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherStub.hashedText
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toEqual(true)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(addAccountParams)

    expect(loadByEmailSpy).toHaveBeenCalledWith(addAccountParams.email)
  })
})
