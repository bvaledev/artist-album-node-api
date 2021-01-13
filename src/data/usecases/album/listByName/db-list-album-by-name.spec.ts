import { LoadAlbumByNameRepository } from "@/data/protocols/db/album/load-albums-by-name-repository"
import { AlbumModel } from "@/domain/models"
import { DbLoadAlbumByName } from "./db-list-album-by-name"

const mockAlbumModel = (): AlbumModel => ({
    id: 'any_id',
    artist_id: 'any_id',
    name: 'any_name',
    cover: 'any_image'
})

const mockLoadAlbumByNameRepository = (): LoadAlbumByNameRepository => {
    class LoadAlbumByNameRepository implements LoadAlbumByNameRepository {
        async loadByName(name: string): Promise<AlbumModel> {
            return Promise.resolve(mockAlbumModel())
        }
    }
    return new LoadAlbumByNameRepository()
}

type SutType = {
    sut: DbLoadAlbumByName,
    loadAlbumByName: LoadAlbumByNameRepository
}

const makeSut = (): SutType => {
    const loadAlbumByName = mockLoadAlbumByNameRepository()
    const sut = new DbLoadAlbumByName(loadAlbumByName)

    return {
        loadAlbumByName,
        sut
    }
}

describe('DbLoadAlbumByName UseCase', () => {
    test('Should call LoadAlbumByIdRepository with correct value', async () => {
        const { sut, loadAlbumByName } = makeSut()
        const addSpy = jest.spyOn(loadAlbumByName, 'loadByName')
        const mockAddAlbumName = 'any_name'
        await sut.loadByName(mockAddAlbumName)
        expect(addSpy).toHaveBeenCalledWith(mockAddAlbumName)
    })
   
    test('Should throw if loadAlbumByName throws', async () => {
        const { sut, loadAlbumByName } = makeSut()
        jest.spyOn(loadAlbumByName, 'loadByName').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddAlbumName = 'any_name'
        const promise = sut.loadByName(mockAddAlbumName)
        await expect(promise).rejects.toThrow()
    })

    test('Should return AlbumModel on success', async () => {
        const { sut } = makeSut()
        const mockAddAlbumName = 'any_name'
        const response = await sut.loadByName(mockAddAlbumName)
        expect(response).toEqual(mockAlbumModel())
    })
})