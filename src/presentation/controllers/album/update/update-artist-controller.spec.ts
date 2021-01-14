import { AlbumModel } from '@/domain/models'
import { AddAlbumModel, UpdateAlbum } from '@/domain/usecases/album'
import { DataExistsError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { UpdateAlbumController } from './update-artist-controller'

export const mockAlbumModel = (): AlbumModel => ({
  id: 'any_id',
  name: 'any_name',
  artist_id: 'any_name',
  cover: 'any_name',
  year: 'any_name',
  youtube: 'https://any_url.com'
})

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  },
  body: {
    name: 'any_name',
    artist_id: 'any_name',
    cover: 'any_name',
    year: 'any_name',
    youtube: 'https://any_url.com'
  }
})

export const mockUpdateAlbumStub = (): UpdateAlbum => {
  class UpdateAlbumStub implements UpdateAlbum {
    async update(id: string, artist: AddAlbumModel): Promise<AlbumModel> {
      return await Promise.resolve(mockAlbumModel())
    }
  }
  return new UpdateAlbumStub()
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
  sut: UpdateAlbumController
  updateAlbumStub: UpdateAlbum
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateAlbumStub = mockUpdateAlbumStub()
  const validationStub = makeValidation()
  const sut = new UpdateAlbumController(validationStub, updateAlbumStub)
  return {
    sut,
    updateAlbumStub,
    validationStub
  }
}

describe('UpdateAlbumController', () => {
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

  test('Should call UpdateAlbum with correct values', async () => {
    const { sut, updateAlbumStub } = makeSut()
    const addSpy = jest.spyOn(updateAlbumStub, 'update')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith('any_id', {
      name: 'any_name',
      artist_id: 'any_name',
      cover: 'any_name',
      year: 'any_name',
      youtube: 'https://any_url.com'
    })
  })

  test('Should return 500 if UpdateAlbum throws', async () => {
    const { sut, updateAlbumStub } = makeSut()
    jest.spyOn(updateAlbumStub, 'update').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if UpdateAlbum return null', async () => {
    const { sut, updateAlbumStub } = makeSut()
    jest.spyOn(updateAlbumStub, 'update').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new DataExistsError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      artist_id: 'any_name',
      cover: 'any_name',
      year: 'any_name',
      youtube: 'https://any_url.com'
    }))
  })
})
