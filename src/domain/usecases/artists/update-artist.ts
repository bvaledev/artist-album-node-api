import { ArtistModel } from '@/domain/models/artist'
import { AddArtistModel } from './add-artist'

export interface UpdateArtist {
  update (id: string, artist: AddArtistModel): Promise<ArtistModel>
}
