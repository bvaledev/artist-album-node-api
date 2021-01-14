import { AlbumModel } from '@/domain/models'
import { DeleteAlbum } from '@/domain/usecases/album/delete-album'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { DeleteAlbumController } from './delete-album-controller'

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
  }
})

export const mockDeleteAlbumStub = (): DeleteAlbum => {
  class DeleteAlbumStub implements DeleteAlbum {
    async delete(id: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteAlbumStub()
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
  sut: DeleteAlbumController
  deleteAlbumStub: DeleteAlbum
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteAlbumStub = mockDeleteAlbumStub()
  const validationStub = makeValidation()
  const sut = new DeleteAlbumController(validationStub, deleteAlbumStub)
  return {
    sut,
    deleteAlbumStub,
    validationStub
  }
}

describe('DeleteAlbumController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call DeleteAlbum with correct values', async () => {
    const { sut, deleteAlbumStub } = makeSut()
    const addSpy = jest.spyOn(deleteAlbumStub, 'delete')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteAlbum throws', async () => {
    const { sut, deleteAlbumStub } = makeSut()
    jest.spyOn(deleteAlbumStub, 'delete').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if DeleteAlbum return false', async () => {
    const { sut, deleteAlbumStub } = makeSut()
    jest.spyOn(deleteAlbumStub, 'delete').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
