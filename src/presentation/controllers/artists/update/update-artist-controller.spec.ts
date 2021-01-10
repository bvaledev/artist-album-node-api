import { ArtistModel } from '@/domain/models'
import { AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { UpdateArtist } from '@/domain/usecases/artists/update-artist'
import { DataExistsError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { UpdateArtistController } from './update-artist-controller'

export const mockArtistModel = (): ArtistModel => ({
  id: 'any_id',
  name: 'any_name'
})

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  },
  body: {
    name: 'any_name'
  }
})

export const mockUpdateArtistStub = (): UpdateArtist => {
  class UpdateArtistStub implements UpdateArtist {
    async update(id: string, artist: AddArtistModel): Promise<ArtistModel> {
      return await Promise.resolve(mockArtistModel())
    }
  }
  return new UpdateArtistStub()
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
  sut: UpdateArtistController
  updateArtistStub: UpdateArtist
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateArtistStub = mockUpdateArtistStub()
  const validationStub = makeValidation()
  const sut = new UpdateArtistController(validationStub, updateArtistStub)
  return {
    sut,
    updateArtistStub,
    validationStub
  }
}

describe('UpdateArtistController', () => {
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

  test('Should call UpdateArtist with correct values', async () => {
    const { sut, updateArtistStub } = makeSut()
    const addSpy = jest.spyOn(updateArtistStub, 'update')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith('any_id', {
      name: 'any_name'
    })
  })

  test('Should return 500 if UpdateArtist throws', async () => {
    const { sut, updateArtistStub } = makeSut()
    jest.spyOn(updateArtistStub, 'update').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if UpdateArtist return null', async () => {
    const { sut, updateArtistStub } = makeSut()
    jest.spyOn(updateArtistStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new DataExistsError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name'
    }))
  })
})
