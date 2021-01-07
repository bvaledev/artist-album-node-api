import { DeleteArtistRepository } from "@/data/protocols/db/artist/delete-artist-repository"
import { LoadArtistByIdRepository } from "@/data/protocols/db/artist/load-artist-by-id-repository"
import { ArtistModel } from "@/domain/models"
import { DbDeleteArtist } from "./db-delete-artist"

const mockArtistModel = (): ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})

const mockDeleteArtistRepositoryStub = (): DeleteArtistRepository => {
    class DeleteArtistRepositoryStub implements DeleteArtistRepository {
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new DeleteArtistRepositoryStub()
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
    sut: DbDeleteArtist,
    deleteArtistRepositoryStub: DeleteArtistRepository
    loadArtistByIdRepositoryStub: LoadArtistByIdRepository
}

const makeSut = (): SutType => {
    const deleteArtistRepositoryStub = mockDeleteArtistRepositoryStub()
    const loadArtistByIdRepositoryStub = mockLoadArtistByIdRepositoryStub()
    const sut = new DbDeleteArtist(deleteArtistRepositoryStub, loadArtistByIdRepositoryStub)

    return {
        sut,
        deleteArtistRepositoryStub,
        loadArtistByIdRepositoryStub
    }
}

describe('DbUpdateArtist UseCase', () => {
    test('Should call LoadArtistByIdRepository with correct value', async () => {
        const { sut, loadArtistByIdRepositoryStub } = makeSut()
        const loadByIdSpy = jest.spyOn(loadArtistByIdRepositoryStub, 'loadById')
        await sut.delete('any_id')
        expect(loadByIdSpy).toHaveBeenCalledWith('any_id',)
    })

    test('Should throw if LoadArtistByIdRepository throws', async () => {
        const { sut, loadArtistByIdRepositoryStub } = makeSut()
        jest.spyOn(loadArtistByIdRepositoryStub, 'loadById').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.delete('any_id')
        await expect(promise).rejects.toThrow()
    })
})