import { ArtistModel } from '@/domain/models'
import { LoadArtistByName } from '@/domain/usecases/artists/load-artist-by-name'

export class DbLoadArtistByName implements LoadArtistByName {
    constructor(private readonly loadArtistByNameRepository: LoadArtistByName) {}
    async loadByName(name: string): Promise<ArtistModel> {
        return await this.loadArtistByNameRepository.loadByName(name)
    }
}