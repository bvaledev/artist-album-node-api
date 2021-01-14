import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeDeleteAlbumValidationComposite } from './delete-album-validation'

jest.mock('@/validation/validation-composite')

describe('DeleteAlbumValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeDeleteAlbumValidationComposite()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
