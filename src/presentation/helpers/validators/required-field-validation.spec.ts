import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('required_field')

  return {
    sut
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('required_field'))
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ required_field: 'any_value' })
    expect(error).toEqual(null)
  })
})
