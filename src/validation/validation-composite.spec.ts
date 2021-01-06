import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

export const mockValidationStub = (): Validation => {
  class ValidatorStub implements Validation {
    validate(input: string): Error {
      return null
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: ValidationComposite
  validatorStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validatorStubs = [
    mockValidationStub(),
    mockValidationStub()
  ]
  const sut = new ValidationComposite(validatorStubs)
  return {
    sut,
    validatorStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
