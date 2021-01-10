import { ArtistModel } from '@/domain/models'
import { LoadAllArtist } from '@/domain/usecases/artists/load-all-artist'
import { ServerError } from '@/presentation/errors'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { ListAllArtistController } from './list-all-artist-controller'

export const mockListArtistModel = (): ArtistModel[] => ([
  {
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'any_id',
    name: 'any_name'
  },
  {
    id: 'any_id',
    name: 'any_name'
  }
])

const mockRequest = (): HttpRequest => ({
  query: {
    order: 'ASC',
    skip: 1,
    limit: 10
  }
})

export const mockLoadAllArtistStub = (): LoadAllArtist => {
  class LoadAllArtistStub implements LoadAllArtist {
    async loadAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<ArtistModel[]> {
      return await Promise.resolve(mockListArtistModel())
    }
  }
  return new LoadAllArtistStub()
}

interface SutTypes {
  sut: ListAllArtistController
  loadAllArtistStub: LoadAllArtist
}

const makeSut = (): SutTypes => {
  const loadAllArtistStub = mockLoadAllArtistStub()
  const sut = new ListAllArtistController(loadAllArtistStub)
  return {
    sut,
    loadAllArtistStub
  }
}

describe('LoadAllArtistController', () => {
  test('Should return 500 if ListAllArtist throws', async () => {
    const { sut, loadAllArtistStub } = makeSut()
    jest.spyOn(loadAllArtistStub, 'loadAll').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if LoadAllArtist return empty', async () => {
    const { sut, loadAllArtistStub } = makeSut()
    jest.spyOn(loadAllArtistStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockListArtistModel()))
  })
})
