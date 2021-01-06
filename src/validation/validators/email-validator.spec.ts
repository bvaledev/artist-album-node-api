import { EmailValidator } from './email-validator'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): EmailValidator => new EmailValidator('email')

describe('EmailValidator', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'invalid_email@' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
