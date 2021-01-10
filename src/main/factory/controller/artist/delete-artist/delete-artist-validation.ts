import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation'

export const makeDeleteArtistValidationComposite = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
