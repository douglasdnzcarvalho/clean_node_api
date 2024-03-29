import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'valid_value', fieldToCompare: 'invalid_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'valid_value', fieldToCompare: 'valid_value' })
    expect(error).toEqual(null)
  })
})
