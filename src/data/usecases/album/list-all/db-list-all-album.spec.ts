import { LoadAllAlbumRepository } from "@/data/protocols/db/album/list-all-albums-repository"
import { AlbumModel } from "@/domain/models"
import { DbLoadAllAlbum } from "./db-list-all-album"

const mockListAlbumModel = (): AlbumModel[] => ([
    {
        id: 'any_id',
        artist_id: 'any_id',
        name: 'any_name',
        cover: 'any_image'
    },
    {
        id: 'any_id',
        artist_id: 'any_id',
        name: 'any_name',
        cover: 'any_image'
    },
    {
        id: 'any_id',
        artist_id: 'any_id',
        name: 'any_name',
        cover: 'any_image'
    },
])

const mockLoadAlbumByNameRepository = (): LoadAllAlbumRepository => {
    class LoadAllAlbumRepositoryStub implements LoadAllAlbumRepository {
        async listAll(order: "ASC" | "DESC", skip: number, limit: number): Promise<AlbumModel[]> {
            return Promise.resolve(mockListAlbumModel())
        }
      
    }
    return new LoadAllAlbumRepositoryStub()
}

type SutType = {
    sut: DbLoadAllAlbum,
    loadAllAlbums: LoadAllAlbumRepository
}

const makeSut = (): SutType => {
    const loadAllAlbums = mockLoadAlbumByNameRepository()
    const sut = new DbLoadAllAlbum(loadAllAlbums)

    return {
        loadAllAlbums,
        sut
    }
}

describe('DbLoadAlbumByName UseCase', () => {
    test('Should throw if loadAlbumByName throws', async () => {
        const { sut, loadAllAlbums } = makeSut()
        jest.spyOn(loadAllAlbums, 'listAll').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.loadAll("DESC", 5, 5)
        await expect(promise).rejects.toThrow()
    })

    test('Should return AlbumModel List on success', async () => {
        const { sut } = makeSut()
        const response = await sut.loadAll("DESC", 5, 5)
        expect(response).toEqual(mockListAlbumModel())
    })
})