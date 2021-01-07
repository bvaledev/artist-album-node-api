import { AddArtistRepository } from '@/data/protocols/db/artist/add-artist-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtist, AddArtistModel } from '@/domain/usecases/artists/add-artist'

export class DbAddArtist implements AddArtist {
    constructor(private readonly addArtistRepository: AddArtistRepository) {}
    async add(artist: AddArtistModel): Promise<ArtistModel> {
        const data = this.addArtistRepository.add(artist)
        return data
    }
}