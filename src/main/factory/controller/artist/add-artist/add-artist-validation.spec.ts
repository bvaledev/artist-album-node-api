import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation'
import { makeAddArtistValidationComposite } from './add-artist-validation'

jest.mock('@/validation/validation-composite')

describe('AddArtistValidationFactory', () => {
  test('Should call validation composite with all validations', async () => {
    makeAddArtistValidationComposite()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
