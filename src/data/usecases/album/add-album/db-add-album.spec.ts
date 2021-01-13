import { AddAlbumRepository } from "@/data/protocols/db/album/add-albums-repository"
import { LoadAlbumByNameRepository } from "@/data/protocols/db/album/load-albums-by-name-repository"
import { AlbumModel } from "@/domain/models"
import { AddAlbumModel } from "@/domain/usecases/album"
import { DbAddAlbum } from "./db-add-album"

const mockAlbumModel = (name: string): AlbumModel => ({
    id: 'any_id',
    artist_id: 'any_id_red',
    name: name,
    year: '2000',
    youtube: 'http://youtube.com',
    images: [' image_1', 'image_2', 'image_3', 'image_4']
})

const mockAddAlbumModel = (name: string): AddAlbumModel => ({
    artist_id: 'any_id_red',
    name: name,
    year: '2000',
    youtube: 'http://youtube.com',
    images: [' image_1', 'image_2', 'image_3', 'image_4']
})

const mockAddAlbumRepository = (): AddAlbumRepository => {
    class AddAlbumRepositoryStub implements AddAlbumRepository {
        async add(album: AddAlbumModel): Promise<AlbumModel> {
            return Promise.resolve(mockAlbumModel('a7x'))
        }
    }
    return new AddAlbumRepositoryStub()
}

const mockLoadAlbumByNameRepositoryStub = (): LoadAlbumByNameRepository => {
    class LoadAlbumByNameRepositoryStub implements LoadAlbumByNameRepository {
        async loadByName(name: string): Promise<AlbumModel> {
            return Promise.resolve(mockAlbumModel('a7x'))
        }
    }
    return new LoadAlbumByNameRepositoryStub()
}

type SutType = {
    sut: AddAlbumRepository,
    addAlbumRepositoryStub: AddAlbumRepository
    loadAlbumByNameRepositoryStub: LoadAlbumByNameRepository
}

const makeSut = (): SutType => {
    const addAlbumRepositoryStub = mockAddAlbumRepository()
    const loadAlbumByNameRepositoryStub = mockLoadAlbumByNameRepositoryStub()
    const sut = new DbAddAlbum(addAlbumRepositoryStub, loadAlbumByNameRepositoryStub)

    return {
        sut,
        addAlbumRepositoryStub,
        loadAlbumByNameRepositoryStub
    }
}

describe('DbAddAlbum UseCase', () => {
    test('Should call LoadAlbumByNameRepository with correct value', async () => {
        const { sut, loadAlbumByNameRepositoryStub } = makeSut()
        const loadByNameSpy = jest.spyOn(loadAlbumByNameRepositoryStub, 'loadByName')
        await sut.add(mockAddAlbumModel('a7x'))
        expect(loadByNameSpy).toHaveBeenCalledWith('a7x')
    })

    test('Should throw if LoadAlbumByNameRepository throws', async () => {
        const { sut, loadAlbumByNameRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByNameRepositoryStub, 'loadByName').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.add(mockAddAlbumModel('a7x'))
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAlbumRepository with correct value', async () => {
        const { sut, addAlbumRepositoryStub, loadAlbumByNameRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        const addSpy = jest.spyOn(addAlbumRepositoryStub, 'add')
        await sut.add(mockAddAlbumModel('a7x'))
        expect(addSpy).toHaveBeenCalledWith(mockAddAlbumModel('a7x'))
    })

    test('Should throw if AddAlbumRepository throws', async () => {
        const { sut, addAlbumRepositoryStub, loadAlbumByNameRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        jest.spyOn(addAlbumRepositoryStub, 'add').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.add(mockAddAlbumModel('a7x'))
        await expect(promise).rejects.toThrow()
    })

    test('Should return AlbumModel on success', async () => {
        const { sut, loadAlbumByNameRepositoryStub } = makeSut()
        jest.spyOn(loadAlbumByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        const response = await sut.add(mockAddAlbumModel('a7x'))
        expect(response).toEqual(mockAlbumModel('a7x'))
    })

    test('Should return null if album alread exists', async () => {
        const { sut } = makeSut()
        const response = await sut.add(mockAddAlbumModel('a7x'))
        expect(response).toEqual(null)
    })
})