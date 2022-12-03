import { makeLoginValidation } from '@/main/factories/controllers/login/login-validation-factory'
import { mockEmailValidator } from '@/tests/validation/mocks'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation('email', mockEmailValidator())
    ])
  })
})
