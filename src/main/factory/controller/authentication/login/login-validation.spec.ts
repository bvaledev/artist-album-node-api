import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite, EmailValidator } from '@/validation'
import { makeLoginValidationComposite } from './login-validation'

jest.mock('@/validation/validation-composite')

describe('LoginValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeLoginValidationComposite()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidator('email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
