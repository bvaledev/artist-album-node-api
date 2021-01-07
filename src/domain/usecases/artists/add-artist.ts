import { ArtistModel } from '@/domain/models/artist'

export type AddArtistModel = {
  name: string
}
export interface AddArtist {
  add (artist: AddArtistModel): Promise<ArtistModel>
}
