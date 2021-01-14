import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeAddAlbumValidationComposite } from './add-album-validation'

jest.mock('@/validation/validation-composite')

describe('AddAlbumValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeAddAlbumValidationComposite()
    const validations: Validation[] = []
    for (const field of ['artist_id', 'cover', 'name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
