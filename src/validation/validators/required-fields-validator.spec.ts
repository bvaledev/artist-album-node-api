import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-fields-validator'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'any_email@email.com' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
