import { ArtistModel } from '@/domain/models'
import { AddArtist, AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { DataExistsError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { AddArtistController } from './add-artist-controller'

export const mockArtistModel = (): ArtistModel => ({
  id: 'any_id',
  name: 'any_name'
})

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

export const mockAddArtistStub = (): AddArtist => {
  class AddArtistStub implements AddArtist {
    async add(account: AddArtistModel): Promise<ArtistModel> {
      return await Promise.resolve(mockArtistModel())
    }
  }
  return new AddArtistStub()
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
  sut: AddArtistController
  addArtistStub: AddArtist
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addArtistStub = mockAddArtistStub()
  const validationStub = makeValidation()
  const sut = new AddArtistController(validationStub, addArtistStub)
  return {
    sut,
    addArtistStub,
    validationStub
  }
}

describe('AddArtistController', () => {
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

  test('Should call AddArtist with correct values', async () => {
    const { sut, addArtistStub } = makeSut()
    const addSpy = jest.spyOn(addArtistStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name'
    })
  })

  test('Should return 500 if AddArtist throws', async () => {
    const { sut, addArtistStub } = makeSut()
    jest.spyOn(addArtistStub, 'add').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
