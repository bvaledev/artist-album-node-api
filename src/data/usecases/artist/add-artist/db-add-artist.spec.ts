import { AddArtistRepository } from "@/data/protocols/db/artist/add-artist-repository"
import { LoadArtistByNameRepository } from "@/data/protocols/db/artist/load-artist-by-name-repository"
import { ArtistModel } from "@/domain/models"
import { AddArtistModel } from "@/domain/usecases/artists/add-artist"
import { DbAddArtist } from "./db-add-artist"

const mockArtistModel = ():ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})

const mockAddArtistRepository = (): AddArtistRepository => {
    class AddArtistRepositoryStub implements AddArtistRepository {
        async add(artist: AddArtistModel): Promise<ArtistModel> {
            return Promise.resolve(mockArtistModel())
        }
    }
    return new AddArtistRepositoryStub()
}

const mockLoadArtistByNameRepositoryStub = (): LoadArtistByNameRepository => {
    class LoadArtistByNameRepositoryStub implements LoadArtistByNameRepository {
        async loadByName(name: string): Promise<ArtistModel[]> {
            return Promise.resolve([mockArtistModel()])
        }
    }
    return new LoadArtistByNameRepositoryStub()
}

type SutType = {
    sut: AddArtistRepository,
    addArtistRepositoryStub: AddArtistRepository
    loadArtistByNameRepositoryStub: LoadArtistByNameRepository
}

const makeSut = (): SutType => {
    const addArtistRepositoryStub = mockAddArtistRepository()
    const loadArtistByNameRepositoryStub = mockLoadArtistByNameRepositoryStub()
    const sut = new DbAddArtist(addArtistRepositoryStub, loadArtistByNameRepositoryStub)

    return {
        addArtistRepositoryStub,
        sut,
        loadArtistByNameRepositoryStub
    }
}

describe('DbAddArtist UseCase', () => {
    test('Should call LoadArtistByNameRepository with correct value', async () => {
        const { sut, loadArtistByNameRepositoryStub } = makeSut()
        const loadByNameSpy = jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName')
        const mockAddArtist = {
            name: 'any_name'
        }
        await sut.add(mockAddArtist)
        expect(loadByNameSpy).toHaveBeenCalledWith(mockAddArtist.name)
    })

    test('Should throw if LoadArtistByNameRepository throws', async () => {
        const { sut, loadArtistByNameRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddArtist = {
            name: 'any_name'
        }
        const promise = sut.add(mockAddArtist)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddArtistRepository with correct value', async () => {
        const { sut, addArtistRepositoryStub, loadArtistByNameRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        const addSpy = jest.spyOn(addArtistRepositoryStub, 'add')
        const mockAddArtist = {
            name: 'any_name'
        }
        await sut.add(mockAddArtist)
        expect(addSpy).toHaveBeenCalledWith(mockAddArtist)
    })
   
    test('Should throw if AddArtistRepository throws', async () => {
        const { sut, addArtistRepositoryStub, loadArtistByNameRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        jest.spyOn(addArtistRepositoryStub, 'add').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddArtist = {
            name: 'any_name'
        }
        const promise = sut.add(mockAddArtist)
        await expect(promise).rejects.toThrow()
    })

    test('Should return ArtistModel on success', async () => {
        const { sut,loadArtistByNameRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
        const mockAddArtist = {
            name: 'any_name'
        }
        const response = await sut.add(mockAddArtist)
        expect(response).toEqual(mockArtistModel())
    })

    test('Should return null if artist alread exists', async () => {
        const { sut } = makeSut()
        const mockAddArtist = {
            name: 'any_name'
        }
        const response = await sut.add(mockAddArtist)
        expect(response).toEqual(null)
    })
})