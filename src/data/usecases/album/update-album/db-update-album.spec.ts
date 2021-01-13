import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository"
import { UpdateAlbumRepository } from "@/data/protocols/db/album/update-albums-repository"
import { AlbumModel } from "@/domain/models"
import { AddAlbumModel } from "@/domain/usecases/album"
import { DbUpdateAlbum } from "./db-update-album"

const mockAlbumModel = (): AlbumModel => ({
    id: 'any_id',
    artist_id: 'any_id',
    name: 'any_name',
    cover: 'any_image'
})

const mockUpdateAlbumRepositoryStub = (): UpdateAlbumRepository => {
    class UpdateAlbumRepositoryStub implements UpdateAlbumRepository {
        async update(id: string, album: AddAlbumModel): Promise<AlbumModel> {
            return Promise.resolve(mockAlbumModel())
        }
    }
    return new UpdateAlbumRepositoryStub()
}

const mockLoadAlbumByIdRepositoryStub = (): LoadAlbumByIdRepository => {
    class LoadAlbumByIdRepositoryStub implements LoadAlbumByIdRepository {
        async loadById(id: string): Promise<AlbumModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadAlbumByIdRepositoryStub()
}

type SutType = {
    sut: DbUpdateAlbum,
    updateAlbumRepositoryStub: UpdateAlbumRepository
    loadAlbumByIdRepositoryStub: LoadAlbumByIdRepository
}

const makeSut = (): SutType => {
    const updateAlbumRepositoryStub = mockUpdateAlbumRepositoryStub()
    const loadAlbumByIdRepositoryStub = mockLoadAlbumByIdRepositoryStub()
    const sut = new DbUpdateAlbum(updateAlbumRepositoryStub, loadAlbumByIdRepositoryStub)

    return {
        sut,
        updateAlbumRepositoryStub,
        loadAlbumByIdRepositoryStub
    }
}

describe('DbUpdateAlbum UseCase', () => {
    test('Should call LoadAlbumByIdRepository with correct value', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById')
        await sut.update('any_id', mockAlbumModel())
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id',)
    })

    test('Should throw if LoadAlbumByIdRepository throws', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.update('any_id', mockAlbumModel())
        await expect(promise).rejects.toThrow()
    })

    test('Should call UpdateAlbumRepository with correct value', async () => {
        const { sut, updateAlbumRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateAlbumRepositoryStub, 'update')
        await sut.update('any_id', mockAlbumModel())
        expect(updateSpy).toHaveBeenCalledWith('any_id', mockAlbumModel())
    })
   
    test('Should throw if UpdateAlbumRepository throws', async () => {
        const { sut, updateAlbumRepositoryStub } = makeSut()
        jest.spyOn(updateAlbumRepositoryStub, 'update').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.update('any_id', mockAlbumModel())
        expect(promise).rejects.toThrow()
    })

    test('Should return Updated AlbumModel on success', async () => {
        const { sut } = makeSut()
        const response = await sut.update('any_id', mockAlbumModel())
        expect(response).toEqual(mockAlbumModel())
    })

    test('Should return null if album alread exists', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
            return Promise.resolve(mockAlbumModel())
        })
        const response = await sut.update('any_id', mockAlbumModel())
        expect(response).toEqual(null)
    })
})