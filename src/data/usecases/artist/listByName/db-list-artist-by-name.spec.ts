import { LoadArtistByNameRepository } from "@/data/protocols/db/artist/load-artist-by-name-repository"
import { ArtistModel } from "@/domain/models"
import { DbLoadArtistByName } from "./db-list-artist-by-name"

const mockArtistModel = (): ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})

const mockLoadArtistByNameRepository = (): LoadArtistByNameRepository => {
    class LoadArtistByNameRepository implements LoadArtistByNameRepository {
        async loadByName(name: string): Promise<ArtistModel> {
            return Promise.resolve(mockArtistModel())
        }
    }
    return new LoadArtistByNameRepository()
}

type SutType = {
    sut: DbLoadArtistByName,
    loadArtistByName: LoadArtistByNameRepository
}

const makeSut = (): SutType => {
    const loadArtistByName = mockLoadArtistByNameRepository()
    const sut = new DbLoadArtistByName(loadArtistByName)

    return {
        loadArtistByName,
        sut
    }
}

describe('DbLoadArtistByName UseCase', () => {
    test('Should call LoadArtistByIdRepository with correct value', async () => {
        const { sut, loadArtistByName } = makeSut()
        const addSpy = jest.spyOn(loadArtistByName, 'loadByName')
        const mockAddArtistName = 'any_name'
        await sut.loadByName(mockAddArtistName)
        expect(addSpy).toHaveBeenCalledWith(mockAddArtistName)
    })
   
    test('Should throw if loadArtistByName throws', async () => {
        const { sut, loadArtistByName } = makeSut()
        jest.spyOn(loadArtistByName, 'loadByName').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockAddArtistName = 'any_name'
        const promise = sut.loadByName(mockAddArtistName)
        await expect(promise).rejects.toThrow()
    })

    test('Should return ArtistModel on success', async () => {
        const { sut } = makeSut()
        const mockAddArtistName = 'any_name'
        const response = await sut.loadByName(mockAddArtistName)
        expect(response).toEqual(mockArtistModel())
    })
})