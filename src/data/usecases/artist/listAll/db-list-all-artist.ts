import { LoadAllArtistsRepository } from '@/data/protocols/db/artist/list-all-artists-repository'
import { ArtistModel } from '@/domain/models'
import { LoadAllArtist } from '@/domain/usecases/artists/load-all-artist'

export class DbLoadAllArtist implements LoadAllArtist {
    constructor(private readonly loadArtistByNameRepository: LoadAllArtistsRepository) {}
    async loadAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<ArtistModel[]> {
        return await this.loadArtistByNameRepository.listAll(order, skip, limit)
    }
}