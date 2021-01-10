import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeLoadByNameArtistValidationComposite } from './load-by-name-artist-validation'

jest.mock('@/validation/validation-composite')

describe('LoadByNameArtistValidationComposite', () => {
  test('Should call validation composite with all validations', async () => {
    makeLoadByNameArtistValidationComposite()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
