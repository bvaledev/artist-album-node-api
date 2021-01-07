import { LoadArtistByIdRepository } from '@/data/protocols/db/artist/load-artist-by-id-repository'
import { ArtistModel } from '@/domain/models'
import { LoadArtistById } from '@/domain/usecases/artists/load-artist-by-id'

export class DbLoadArtistById implements LoadArtistById {
    constructor(private readonly loadArtistByIdRepository: LoadArtistByIdRepository) {}
    async loadById(id: string): Promise<ArtistModel> {
        return await this.loadArtistByIdRepository.loadById(id)
    }
}