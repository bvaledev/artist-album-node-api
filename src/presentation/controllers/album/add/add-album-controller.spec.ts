import { AlbumModel } from '@/domain/models'
import { AddAlbum, AddAlbumModel } from '@/domain/usecases/album'
import { DataExistsError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { AddAlbumController } from './add-album-controller'

export const mockAlbumModel = (): AlbumModel => ({
  id: 'any_id',
  name: 'any_name',
  artist_id: 'any_name',
  cover: 'any_name',
  year: 'any_name',
  youtube: 'https://any_url.com'
})

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    artist_id: 'any_name',
    cover: 'any_name',
    year: 'any_name',
    youtube: 'https://any_url.com'
  }
})

export const mockAddAlbumStub = (): AddAlbum => {
  class AddAlbumStub implements AddAlbum {
    async add(albumData: AddAlbumModel): Promise<AlbumModel> {
      return await Promise.resolve(mockAlbumModel())
    }
  }
  return new AddAlbumStub()
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
  sut: AddAlbumController
  addAlbumStub: AddAlbum
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAlbumStub = mockAddAlbumStub()
  const validationStub = makeValidation()
  const sut = new AddAlbumController(validationStub, addAlbumStub)
  return {
    sut,
    addAlbumStub,
    validationStub
  }
}

describe('AddAlbumController', () => {
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

  test('Should call AddAlbum with correct values', async () => {
    const { sut, addAlbumStub } = makeSut()
    const addSpy = jest.spyOn(addAlbumStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      artist_id: 'any_name',
      cover: 'any_name',
      year: 'any_name',
      youtube: 'https://any_url.com'
    })
  })

  test('Should return 500 if AddAlbum throws', async () => {
    const { sut, addAlbumStub } = makeSut()
    jest.spyOn(addAlbumStub, 'add').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if AddAlbum return null', async () => {
    const { sut, addAlbumStub } = makeSut()
    jest.spyOn(addAlbumStub, 'add').mockReturnValueOnce(Promise.resolve(null))
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
