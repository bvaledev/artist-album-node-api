import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation'

export const makeAddAlbumValidationComposite = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['artist_id', 'cover', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
