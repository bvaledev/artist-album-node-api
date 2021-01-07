import { DeleteArtistRepository } from '@/data/protocols/db/artist/delete-artist-repository'
import { LoadArtistByIdRepository } from '@/data/protocols/db/artist/load-artist-by-id-repository'
import { DeleteArtist } from '@/domain/usecases/artists/delete-artist'

export class DbDeleteArtist implements DeleteArtist {
    constructor(
        private readonly deleteArtistRepository: DeleteArtistRepository,
        private readonly loadArtistByIdRepository: LoadArtistByIdRepository
    ) {}

    async delete(id: string): Promise<boolean> {
        const artistExists = await this.loadArtistByIdRepository.loadById(id)
        if(artistExists){
            return this.deleteArtistRepository.delete(id)
        }
        return null
    }
}