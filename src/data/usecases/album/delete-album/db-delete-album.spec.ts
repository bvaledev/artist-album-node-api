import { DeleteAlbumRepository } from "@/data/protocols/db/album/delete-albums-repository"
import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository"
import { AlbumModel } from "@/domain/models"
import { DbDeleteAlbum } from "./db-delete-album"

const mockAlbumModel = (): AlbumModel => ({
    id: 'any_id',
    artist_id: 'any_id',
    name: 'any_name',
    cover: 'any_image'
})


const mockDeleteAlbumRepositoryStub = (): DeleteAlbumRepository => {
    class DeleteAlbumRepositoryStub implements DeleteAlbumRepository {
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new DeleteAlbumRepositoryStub()
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
    sut: DbDeleteAlbum,
    deleteAlbumRepositoryStub: DeleteAlbumRepository
    loadAlbumByIdRepositoryStub: LoadAlbumByIdRepository
}

const makeSut = (): SutType => {
    const deleteAlbumRepositoryStub = mockDeleteAlbumRepositoryStub()
    const loadAlbumByIdRepositoryStub = mockLoadAlbumByIdRepositoryStub()
    const sut = new DbDeleteAlbum(deleteAlbumRepositoryStub, loadAlbumByIdRepositoryStub)

    return {
        sut,
        deleteAlbumRepositoryStub,
        loadAlbumByIdRepositoryStub
    }
}

describe('DbUpdateAlbum UseCase', () => {
    test('Should call LoadAlbumByIdRepository with correct value', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById')
        await sut.delete('any_id')
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id',)
    })

    test('Should throw if LoadAlbumByIdRepository throws', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.delete('any_id')
        await expect(promise).rejects.toThrow()
    })

    test('Should call DeleteAlbumRepository with correct value', async () => {
        const { sut, deleteAlbumRepositoryStub, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(mockAlbumModel()))
        const updateSpy = jest.spyOn(deleteAlbumRepositoryStub, 'delete')
        await sut.delete('any_id')
        expect(updateSpy).toHaveBeenCalledWith('any_id')
    })
   
    test('Should throw if DeleteAlbumRepository throws', async () => {
        const { sut, deleteAlbumRepositoryStub, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(mockAlbumModel()))
        jest.spyOn(deleteAlbumRepositoryStub, 'delete').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.delete('any_id')
        await expect(promise).rejects.toThrow()
    })

    test('Should return true on delete', async () => {
        const { sut, loadAlbumByIdRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(mockAlbumModel()))
        const response = await sut.delete('any_id')
        expect(response).toEqual(true)
    })

    test('Should return null if album not exists', async () => {
        const { sut } = makeSut()
        const response = await sut.delete('any_id')
        expect(response).toEqual(null)
    })
})