import { InvalidParamError, MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs: validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return the first error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('invalid_field'))
    jest.spyOn(validationStubs[2], 'validate').mockReturnValueOnce(new MissingParamError('required_field'))
    const error = sut.validate({})
    expect(error).toEqual(new Error())
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(null)
  })
})
