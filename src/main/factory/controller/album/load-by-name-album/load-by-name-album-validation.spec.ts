import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeLoadByNameAlbumValidationComposite } from './load-by-name-album-validation'

jest.mock('@/validation/validation-composite')

describe('LoadByNameAlbumValidationComposite', () => {
  test('Should call validation composite with all validations', async () => {
    makeLoadByNameAlbumValidationComposite()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
