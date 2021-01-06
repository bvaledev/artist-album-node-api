import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation, EmailValidator } from '@/validation'

export const makeLoginValidationComposite = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidator('email'))
  return new ValidationComposite(validations)
}
