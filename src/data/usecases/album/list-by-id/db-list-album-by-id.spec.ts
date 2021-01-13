import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository"
import { AlbumModel } from "@/domain/models"
import { DbLoadAlbumById } from "./db-list-album-by-id"

const mockAlbumModel = (): AlbumModel => ({
    id: 'any_id',
    artist_id: 'any_id',
    name: 'any_name',
    images: []
})

const mockLoadAlbumByIdRepository = (): LoadAlbumByIdRepository => {
    class LoadAlbumByIdRepositoryStub implements LoadAlbumByIdRepository {
        async loadById(id: string): Promise<AlbumModel> {
            return Promise.resolve(mockAlbumModel())
        }
    }
    return new LoadAlbumByIdRepositoryStub()
}

type SutType = {
    sut: DbLoadAlbumById,
    loadAlbumById: LoadAlbumByIdRepository
}

const makeSut = (): SutType => {
    const loadAlbumById = mockLoadAlbumByIdRepository()
    const sut = new DbLoadAlbumById(loadAlbumById)

    return {
        loadAlbumById,
        sut
    }
}

describe('DbLoadAlbumById UseCase', () => {
    test('Should call LoadAlbumByIdRepository with correct value', async () => {
        const { sut, loadAlbumById } = makeSut()
        const addSpy = jest.spyOn(loadAlbumById, 'loadById')
        const mockAddAlbumName = 'any_id'
        await sut.loadById(mockAddAlbumName)
        expect(addSpy).toHaveBeenCalledWith(mockAddAlbumName)
    })
   
    test('Should throw if LoadAlbumByIdRepository throws', async () => {
        const { sut, loadAlbumById } = makeSut()
        jest.spyOn(loadAlbumById, 'loadById').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddAlbumName = 'any_id'
        const promise = sut.loadById(mockAddAlbumName)
        await expect(promise).rejects.toThrow()
    })

    test('Should return AlbumModel on success', async () => {
        const { sut } = makeSut()
        const mockAddAlbumName = 'any_id'
        const response = await sut.loadById(mockAddAlbumName)
        expect(response).toEqual(mockAlbumModel())
    })
})