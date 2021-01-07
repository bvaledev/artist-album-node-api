import { LoadArtistByNameRepository } from '@/data/protocols/db/artist/load-artist-by-name-repository'
import { ArtistModel } from '@/domain/models'
import { LoadArtistByName } from '@/domain/usecases/artists/load-artist-by-name'

export class DbLoadArtistByName implements LoadArtistByName {
    constructor(private readonly loadArtistByNameRepository: LoadArtistByNameRepository) {}
    async loadByName(name: string): Promise<ArtistModel> {
        return await this.loadArtistByNameRepository.loadByName(name)
    }
}