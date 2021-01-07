import { ArtistModel } from '@/domain/models'
import { LoadArtistById } from '@/domain/usecases/artists/load-artist-by-id'

export class DbLoadArtistById implements LoadArtistById {
    constructor(private readonly loadArtistByIdRepository: LoadArtistById) {}
    async loadById(id: string): Promise<ArtistModel> {
        return await this.loadArtistByIdRepository.loadById(id)
    }
}