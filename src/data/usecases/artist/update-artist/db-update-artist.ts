import { LoadArtistByIdRepository } from '@/data/protocols/db/artist/load-artist-by-id-repository'
import { UpdateArtistRepository } from '@/data/protocols/db/artist/update-artist-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { UpdateArtist } from '@/domain/usecases/artists/update-artist'

export class DbUpdateArtist implements UpdateArtist {
    constructor(
        private readonly updateArtistRepository: UpdateArtistRepository,
        private readonly loadArtistByIdRepository: LoadArtistByIdRepository
    ) {}
    async update(id: string, artist: AddArtistModel): Promise<ArtistModel> {
        const artistExists = await this.loadArtistByIdRepository.loadById(id)
        if(!artistExists){
            return this.updateArtistRepository.update(id, artist)
        }
        return null
    }
}