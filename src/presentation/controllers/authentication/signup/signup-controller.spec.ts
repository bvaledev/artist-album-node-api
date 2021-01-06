import { mockAccountModel } from '@/data/test'
import { UserModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { SignUpController } from './signup-controller'

export const mockAddAccountStub = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<UserModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccountStub()
  const validationStub = makeValidation()
  const sut = new SignUpController(validationStub, addAccountStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SignupController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 403 AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })
})
