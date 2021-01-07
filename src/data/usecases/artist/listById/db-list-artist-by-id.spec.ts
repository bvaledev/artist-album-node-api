import { LoadArtistByIdRepository } from "@/data/protocols/db/artist/load-artist-by-id-repository"
import { ArtistModel } from "@/domain/models"
import { AddArtistModel } from "@/domain/usecases/artists/add-artist"
import { DbLoadArtistById } from "./db-list-artist-by-id"

const mockArtistModel = (): ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})

const mockLoadArtistByIdRepository = (): LoadArtistByIdRepository => {
    class AddArtistRepositoryStub implements LoadArtistByIdRepository {
        async loadById(id: string): Promise<ArtistModel> {
            return Promise.resolve(mockArtistModel())
        }
    }
    return new AddArtistRepositoryStub()
}

type SutType = {
    sut: DbLoadArtistById,
    loadArtistById: LoadArtistByIdRepository
}

const makeSut = (): SutType => {
    const loadArtistById = mockLoadArtistByIdRepository()
    const sut = new DbLoadArtistById(loadArtistById)

    return {
        loadArtistById,
        sut
    }
}

describe('DbAddArtist UseCase', () => {
    test('Should call LoadArtistByIdRepository with correct value', async () => {
        const { sut, loadArtistById } = makeSut()
        const addSpy = jest.spyOn(loadArtistById, 'loadById')
        const mockAddArtist = 'any_id'
        await sut.loadById(mockAddArtist)
        expect(addSpy).toHaveBeenCalledWith(mockAddArtist)
    })
   
    // test('Should throw if AddArtistRepository throws', async () => {
    //     const { sut, addArtistRepositoryStub } = makeSut()
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
    //     const { sut } = makeSut()
    //     const mockAddArtist = {
    //         name: 'any_name'
    //     }
    //     const response = await sut.add(mockAddArtist)
    //     expect(response).toEqual(mockArtistModel())
    // })
})