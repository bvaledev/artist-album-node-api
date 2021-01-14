import { AlbumModel } from '@/domain/models'
import { LoadAlbumByName } from '@/domain/usecases/album/load-album-by-name'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { LoadAlbumByNameController } from './load-by-name-album-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

export const mockLoadAlbumByNameStub = (): LoadAlbumByName => {
  class LoadAlbumByNameStub implements LoadAlbumByName {
    async loadByName(name: string): Promise<AlbumModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        artist_id: 'any_name',
        cover: 'any_name',
        year: 'any_name',
        youtube: 'https://any_url.com'
      })
    }
  }
  return new LoadAlbumByNameStub()
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
  sut: LoadAlbumByNameController
  loadAlbumByNameStub: LoadAlbumByName
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadAlbumByNameStub = mockLoadAlbumByNameStub()
  const validationStub = makeValidation()
  const sut = new LoadAlbumByNameController(validationStub, loadAlbumByNameStub)
  return {
    sut,
    loadAlbumByNameStub,
    validationStub
  }
}

describe('LoadByNameAlbumController', () => {
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

  test('Should call LoadByNameAlbum with correct values', async () => {
    const { sut, loadAlbumByNameStub } = makeSut()
    const loadSpy = jest.spyOn(loadAlbumByNameStub, 'loadByName')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_name')
  })

  test('Should return 500 if LoadByNameAlbum throws', async () => {
    const { sut, loadAlbumByNameStub } = makeSut()
    jest.spyOn(loadAlbumByNameStub, 'loadByName').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if LoadByNameAlbum return null', async () => {
    const { sut, loadAlbumByNameStub } = makeSut()
    jest.spyOn(loadAlbumByNameStub, 'loadByName').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
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
