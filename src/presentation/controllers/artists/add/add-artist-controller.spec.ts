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
})
