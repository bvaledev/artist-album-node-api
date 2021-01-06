import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, CompareFieldValidation, ValidationComposite, EmailValidator } from '@/validation'
import { makeSignupValidationComposite } from './signup-validation'

jest.mock('@/validation/validation-composite')

describe('SignupValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeSignupValidationComposite()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidator('email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
