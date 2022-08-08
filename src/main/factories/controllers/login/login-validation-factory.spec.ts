import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidator } from '@/validation/protocols'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation('email', makeEmailValidator())
    ])
  })
})
