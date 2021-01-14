import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeLoadByArtistAlbumValidationComposite } from './load-by-artist-album-validation'

jest.mock('@/validation/validation-composite')

describe('LoadByArtistAlbumValidationComposite', () => {
  test('Should call validation composite with all validations', async () => {
    makeLoadByArtistAlbumValidationComposite()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
