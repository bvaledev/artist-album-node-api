import { EmailValidator } from './email-validator'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): EmailValidator => new EmailValidator('email')

describe('EmailValidator', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'invalid_email@' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should not return error if no email is provided', () => {
    const sut = makeSut()
    const error = sut.validate({ password: 'any_password', passwordConfirmation: 'any_password' })
    expect(error).toBeFalsy()
  })

  test('Should not return error if email is correct', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'valid_email@email.com' })
    expect(error).toBeFalsy()
  })
})
