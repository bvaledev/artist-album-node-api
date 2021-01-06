import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldValidation } from './compare-fields-validator'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}
describe('Compare Field Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field1', fieldToCompare: 'any_field' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
