import { ArtistModel } from '@/domain/models'
import { DeleteArtist } from '@/domain/usecases/artists/delete-artist'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { DeleteArtistController } from './delete-artist-controller'

export const mockArtistModel = (): ArtistModel => ({
  id: 'any_id',
  name: 'any_name'
})

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

export const mockDeleteArtistStub = (): DeleteArtist => {
  class DeleteArtistStub implements DeleteArtist {
    async delete(id: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new DeleteArtistStub()
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
  sut: DeleteArtistController
  deleteArtistStub: DeleteArtist
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteArtistStub = mockDeleteArtistStub()
  const validationStub = makeValidation()
  const sut = new DeleteArtistController(validationStub, deleteArtistStub)
  return {
    sut,
    deleteArtistStub,
    validationStub
  }
}

describe('DeleteArtistController', () => {
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

  test('Should call DeleteArtist with correct values', async () => {
    const { sut, deleteArtistStub } = makeSut()
    const addSpy = jest.spyOn(deleteArtistStub, 'delete')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteArtist throws', async () => {
    const { sut, deleteArtistStub } = makeSut()
    jest.spyOn(deleteArtistStub, 'delete').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if DeleteArtist return false', async () => {
    const { sut, deleteArtistStub } = makeSut()
    jest.spyOn(deleteArtistStub, 'delete').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
