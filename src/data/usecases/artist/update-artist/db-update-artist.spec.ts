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
    test('Should call LoadArtistByIdRepository with correct value', async () => {
        const { sut, loadArtistByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadArtistByIdRepositoryStub, 'loadById')
        const mockUpdateArtist = {
            name: 'any_name'
        }
        await sut.update('any_id', mockUpdateArtist)
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id',)
    })

    test('Should throw if LoadArtistByIdRepository throws', async () => {
        const { sut, loadArtistByIdRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => {
            throw new Error()
        })
        const mockUpdateArtist = {
            name: 'any_name'
        }
        const promise = sut.update('any_id', mockUpdateArtist)
        await expect(promise).rejects.toThrow()
    })

    test('Should call UpdateArtistRepository with correct value', async () => {
        const { sut, updateArtistRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateArtistRepositoryStub, 'update')
        const mockUpdateArtist = {
            name: 'any_name'
        }
        await sut.update('any_id', mockUpdateArtist)
        expect(updateSpy).toHaveBeenCalledWith('any_id', mockUpdateArtist)
    })
})