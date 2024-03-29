import { JwtAdapter } from '@/infra/criptography'
import { throwError } from '@/tests/domain/mocks'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'token'
  },

  verify (): string {
    return 'any_value'
  }
}))

const secret = 'secret'
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, secret)
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const hash = await sut.encrypt('any_value')
      expect(hash).toBe('token')
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)

      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
