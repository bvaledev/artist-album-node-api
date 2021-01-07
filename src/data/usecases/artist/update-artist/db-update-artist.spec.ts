import { AddArtistRepository } from "@/data/protocols/db/artist/add-artist-repository"
import { LoadArtistByIdRepository } from "@/data/protocols/db/artist/load-artist-by-id-repository"
import { LoadArtistByNameRepository } from "@/data/protocols/db/artist/load-artist-by-name-repository"
import { UpdateArtistRepository } from "@/data/protocols/db/artist/update-artist-repository"
import { ArtistModel } from "@/domain/models"
import { AddArtistModel } from "@/domain/usecases/artists/add-artist"
import { DbUpdateArtist } from "./db-update-artist"

const mockArtistModel = (): ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})

const mockUpdateArtistRepositoryStub = (): UpdateArtistRepository => {
    class UpdateArtistRepositoryStub implements UpdateArtistRepository {
        async update(id: string, artist: AddArtistModel): Promise<ArtistModel> {
            return Promise.resolve(null)
        }
    }
    return new UpdateArtistRepositoryStub()
}

const mockLoadArtistByIdRepositoryStub = (): LoadArtistByIdRepository => {
    class LoadArtistByIdRepositoryStub implements LoadArtistByIdRepository {
        async loadById(id: string): Promise<ArtistModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadArtistByIdRepositoryStub()
}

type SutType = {
    sut: DbUpdateArtist,
    updateArtistRepositoryStub: UpdateArtistRepository
    loadArtistByIdRepositoryStub: LoadArtistByIdRepository
}

const makeSut = (): SutType => {
    const updateArtistRepositoryStub = mockUpdateArtistRepositoryStub()
    const loadArtistByIdRepositoryStub = mockLoadArtistByIdRepositoryStub()
    const sut = new DbUpdateArtist(updateArtistRepositoryStub, loadArtistByIdRepositoryStub)

    return {
        sut,
        updateArtistRepositoryStub,
        loadArtistByIdRepositoryStub
    }
}

describe('DbUpdateArtist UseCase', () => {
    test('Should call LoadArtistByNameRepository with correct value', async () => {
        const { sut, loadArtistByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadArtistByIdRepositoryStub, 'loadById')
        const mockUpdateArtist = {
            name: 'any_name'
        }
        await sut.update('any_id', mockUpdateArtist)
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id',)
    })

    // test('Should throw if LoadArtistByNameRepository throws', async () => {
    //     const { sut, loadArtistByNameRepositoryStub } = makeSut()
    //     jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockImplementationOnce((): never => {
    //         throw new Error()
    //     })
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     const promise = sut.add(mockAddArtist)
    //     await expect(promise).rejects.toThrow()
    // })

    // test('Should call AddArtistRepository with correct value', async () => {
    //     const { sut, addArtistRepositoryStub, loadArtistByNameRepositoryStub } = makeSut()
    //     jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
    //     const addSpy = jest.spyOn(addArtistRepositoryStub, 'add')
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     await sut.add(mockAddArtist)
    //     expect(addSpy).toHaveBeenCalledWith(mockAddArtist)
    // })
   
    // test('Should throw if AddArtistRepository throws', async () => {
    //     const { sut, addArtistRepositoryStub, loadArtistByNameRepositoryStub } = makeSut()
    //     jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
    //     jest.spyOn(addArtistRepositoryStub, 'add').mockImplementationOnce((): never => {
    //         throw new Error()
    //     })
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     const promise = sut.add(mockAddArtist)
    //     await expect(promise).rejects.toThrow()
    // })

    // test('Should return ArtistModel on success', async () => {
    //     const { sut,loadArtistByNameRepositoryStub } = makeSut()
    //     jest.spyOn(loadArtistByNameRepositoryStub, 'loadByName').mockReturnValue(Promise.resolve(null))
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     const response = await sut.add(mockAddArtist)
    //     expect(response).toEqual(mockArtistModel())
    // })

    // test('Should return null if artist alread exists', async () => {
    //     const { sut } = makeSut()
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     const response = await sut.add(mockAddArtist)
    //     expect(response).toEqual(null)
    // })
})