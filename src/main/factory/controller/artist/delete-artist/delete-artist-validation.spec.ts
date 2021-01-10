import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeDeleteArtistValidationComposite } from './delete-artist-validation'

jest.mock('@/validation/validation-composite')

describe('DeleteArtistValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeDeleteArtistValidationComposite()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
