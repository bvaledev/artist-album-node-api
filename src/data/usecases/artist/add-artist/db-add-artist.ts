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
        let artistExists:ArtistModel[]= await this.loadArtistByNameRepository.loadByName(artist.name)
        console.log('1', artistExists, typeof artistExists)
        if(artistExists === null || Array.isArray(artistExists) && artistExists.length === 0){
            const data = await this.addArtistRepository.add(artist)
            console.log('2', data)
            return data
        }
        console.log('null', null)
        return null
    }
}