import { Validation } from '@/presentation/protocols/validation'
import { CompareFieldValidation, EmailValidator, RequiredFieldValidation, ValidationComposite } from '@/validation'

export const makeSignupValidationComposite = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidator('email'))
  return new ValidationComposite(validations)
}
