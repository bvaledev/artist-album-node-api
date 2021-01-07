import { LoadAllArtistsRepository } from "@/data/protocols/db/artist/list-all-artists-repository"
import { ArtistModel } from "@/domain/models"
import { DbLoadAllArtist } from "./db-list-all-artist"

const mockArtistModel = (): ArtistModel => ({
    id: 'any_id',
    name: 'any_name'
})
const mockListArtistModel = (): ArtistModel[] => ([
    {
        id: 'any_id1',
        name: 'any_name1'
    },
    {
        id: 'any_id2',
        name: 'any_name2'
    },
    {
        id: 'any_id3',
        name: 'any_name3'
    },
])

const mockLoadArtistByNameRepository = (): LoadAllArtistsRepository => {
    class LoadAllArtistsRepositoryStub implements LoadAllArtistsRepository {
        async listAll(order: "ASC" | "DESC", skip: number, limit: number): Promise<ArtistModel[]> {
            return Promise.resolve(mockListArtistModel())
        }
      
    }
    return new LoadAllArtistsRepositoryStub()
}

type SutType = {
    sut: DbLoadAllArtist,
    loadAllArtists: LoadAllArtistsRepository
}

const makeSut = (): SutType => {
    const loadAllArtists = mockLoadArtistByNameRepository()
    const sut = new DbLoadAllArtist(loadAllArtists)

    return {
        loadAllArtists,
        sut
    }
}

describe('DbLoadArtistByName UseCase', () => {
    test('Should throw if loadArtistByName throws', async () => {
        const { sut, loadAllArtists } = makeSut()
        jest.spyOn(loadAllArtists, 'listAll').mockImplementationOnce((): never => {
            throw new Error()
        })
        const promise = sut.loadAll("DESC", 5, 5)
        await expect(promise).rejects.toThrow()
    })

    test('Should return ArtistModel List on success', async () => {
        const { sut } = makeSut()
        const response = await sut.loadAll("DESC", 5, 5)
        expect(response).toEqual(mockListArtistModel())
    })
})