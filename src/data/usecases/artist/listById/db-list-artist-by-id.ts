import { AddArtistRepository } from '@/data/protocols/db/artist/add-artist-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtist, AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { LoadArtistById } from '@/domain/usecases/artists/load-artist-by-id'

export class DbLoadArtistById implements LoadArtistById {
    constructor(private readonly loadArtistByIdRepository: LoadArtistById) {}
    async loadById(id: string): Promise<ArtistModel> {
        await this.loadArtistByIdRepository.loadById(id)
        return null
    }
}