import { AddArtistRepository } from '@/data/protocols/db/artist/add-artist-repository'
import { LoadArtistByNameRepository } from '@/data/protocols/db/artist/load-artist-by-name-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtist, AddArtistModel } from '@/domain/usecases/artists/add-artist'

export class DbAddArtist implements AddArtist {
    constructor(
        private readonly addArtistRepository: AddArtistRepository,
        private readonly loadArtistByNameRepository: LoadArtistByNameRepository
    ) {}
    async add(artist: AddArtistModel): Promise<ArtistModel> {
        const artistExists = await this.loadArtistByNameRepository.loadByName(artist.name)

        if(!artistExists){
            const data = this.addArtistRepository.add(artist)
            return data
        }

        return null
    }
}