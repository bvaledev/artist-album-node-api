import { ArtistModel } from '@/domain/models'
import { LoadArtistByName } from '@/domain/usecases/artists/load-artist-by-name'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { LoadArtistByNameController } from './load-by-name-artist-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

export const mockLoadArtistByNameStub = (): LoadArtistByName => {
  class LoadArtistByNameStub implements LoadArtistByName {
    async loadByName(name: string): Promise<ArtistModel[]> {
      return await Promise.resolve([{
        id: 'any_id',
        name: 'any_name'
      }])
    }
  }
  return new LoadArtistByNameStub()
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
  sut: LoadArtistByNameController
  loadArtistByNameStub: LoadArtistByName
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadArtistByNameStub = mockLoadArtistByNameStub()
  const validationStub = makeValidation()
  const sut = new LoadArtistByNameController(validationStub, loadArtistByNameStub)
  return {
    sut,
    loadArtistByNameStub,
    validationStub
  }
}

describe('LoadByNameArtistController', () => {
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

  test('Should call LoadByNameArtist with correct values', async () => {
    const { sut, loadArtistByNameStub } = makeSut()
    const loadSpy = jest.spyOn(loadArtistByNameStub, 'loadByName')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_name')
  })

  test('Should return 500 if LoadByNameArtist throws', async () => {
    const { sut, loadArtistByNameStub } = makeSut()
    jest.spyOn(loadArtistByNameStub, 'loadByName').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if LoadByNameArtist return null', async () => {
    const { sut, loadArtistByNameStub } = makeSut()
    jest.spyOn(loadArtistByNameStub, 'loadByName').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok([{
      id: 'any_id',
      name: 'any_name'
    }]))
  })
})
