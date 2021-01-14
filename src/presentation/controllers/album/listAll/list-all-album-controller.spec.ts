import { AlbumModel } from '@/domain/models'
import { LoadAllAlbum } from '@/domain/usecases/album/load-all-album'
import { ServerError } from '@/presentation/errors'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { ListAllAlbumController } from './list-all-album-controller'

export const mockListAlbumModel = (): AlbumModel[] => ([
  {
    id: 'any_id',
    name: 'any_name',
    artist_id: 'any_name',
    cover: 'any_name',
    year: 'any_name',
    youtube: 'https://any_url.com'
  },{
    id: 'any_id',
    name: 'any_name',
    artist_id: 'any_name',
    cover: 'any_name',
    year: 'any_name',
    youtube: 'https://any_url.com'
  },{
    id: 'any_id',
    name: 'any_name',
    artist_id: 'any_name',
    cover: 'any_name',
    year: 'any_name',
    youtube: 'https://any_url.com'
  }
])

const mockRequest = (): HttpRequest => ({
  query: {
    order: 'ASC',
    skip: 1,
    limit: 10
  }
})

export const mockLoadAllAlbumStub = (): LoadAllAlbum => {
  class LoadAllAlbumStub implements LoadAllAlbum {
    async loadAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]> {
      return await Promise.resolve(mockListAlbumModel())
    }
  }
  return new LoadAllAlbumStub()
}

interface SutTypes {
  sut: ListAllAlbumController
  loadAllAlbumStub: LoadAllAlbum
}

const makeSut = (): SutTypes => {
  const loadAllAlbumStub = mockLoadAllAlbumStub()
  const sut = new ListAllAlbumController(loadAllAlbumStub)
  return {
    sut,
    loadAllAlbumStub
  }
}

describe('LoadAllAlbumController', () => {
  test('Should return 500 if ListAllAlbum throws', async () => {
    const { sut, loadAllAlbumStub } = makeSut()
    jest.spyOn(loadAllAlbumStub, 'loadAll').mockImplementationOnce((): never => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if LoadAllAlbum return empty', async () => {
    const { sut, loadAllAlbumStub } = makeSut()
    jest.spyOn(loadAllAlbumStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockListAlbumModel()))
  })
})
