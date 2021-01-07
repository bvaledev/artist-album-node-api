import { AddArtistRepository } from "@/data/protocols/db/artist/add-artist-repository"
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

type SutType = {
    sut: AddArtistRepository,
    addArtistRepositoryStub: AddArtistRepository
}

const makeSut = (): SutType => {
    const addArtistRepositoryStub = mockAddArtistRepository()
    const sut = new DbAddArtist(addArtistRepositoryStub)

    return {
        addArtistRepositoryStub,
        sut
    }
}

describe('DbAddArtist UseCase', () => {
    test('Should call AddArtistRepository with correct value', async () => {
        const { sut, addArtistRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addArtistRepositoryStub, 'add')
        const mockAddArtist = {
            name: 'any_name'
        }
        await sut.add(mockAddArtist)
        expect(addSpy).toHaveBeenCalledWith(mockAddArtist)
    })
})