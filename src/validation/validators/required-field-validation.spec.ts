import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('required_field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('required_field'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ required_field: 'any_value' })
    expect(error).toEqual(null)
  })
})
