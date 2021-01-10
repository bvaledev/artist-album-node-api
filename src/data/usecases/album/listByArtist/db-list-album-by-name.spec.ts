import { LoadAlbumByArtistRepository } from "@/data/protocols/db/album/load-albums-by-artist-repository"
import { AlbumModel } from "@/domain/models"
import { DbLoadAlbumByArtist } from "./db-list-album-by-name"

const mockListAlbumModel = (): AlbumModel[] => ([
    {
        id: 'any_id',
        name: 'any_name',
        artist_id: 'any_id',
        images: [],
    }
])

const mockLoadAlbumByArtistRepository = (): LoadAlbumByArtistRepository => {
    class LoadAlbumByArtistRepository implements LoadAlbumByArtistRepository {
        async loadByArtist(artistName: string, order?: 'ASC' | 'DESC', skip?: number, limit?: number): Promise<AlbumModel[]> {
            return Promise.resolve(mockListAlbumModel())
        }
    }
    return new LoadAlbumByArtistRepository()
}

type SutType = {
    sut: DbLoadAlbumByArtist,
    loadAlbumByArtist: LoadAlbumByArtistRepository
}

const makeSut = (): SutType => {
    const loadAlbumByArtist = mockLoadAlbumByArtistRepository()
    const sut = new DbLoadAlbumByArtist(loadAlbumByArtist)

    return {
        loadAlbumByArtist,
        sut
    }
}

describe('DbLoadAlbumByArtist UseCase', () => {
    test('Should call LoadAlbumByIdRepository with correct value', async () => {
        const { sut, loadAlbumByArtist } = makeSut()
        const addSpy = jest.spyOn(loadAlbumByArtist, 'loadByArtist')
        const mockAddAlbumArtist = 'any_artist'
        await sut.loadByArtist(mockAddAlbumArtist)
        expect(addSpy).toHaveBeenCalledWith(mockAddAlbumArtist)
    })
   
    test('Should throw if loadAlbumByArtist throws', async () => {
        const { sut, loadAlbumByArtist } = makeSut()
        jest.spyOn(loadAlbumByArtist, 'loadByArtist').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddAlbumArtist = 'any_artist'
        const promise = sut.loadByArtist(mockAddAlbumArtist)
        await expect(promise).rejects.toThrow()
    })

    test('Should return List of AlbumModel on success', async () => {
        const { sut } = makeSut()
        const mockAddAlbumArtist = 'any_artist'
        const response = await sut.loadByArtist(mockAddAlbumArtist)
        expect(response).toEqual(mockListAlbumModel())
    })
})