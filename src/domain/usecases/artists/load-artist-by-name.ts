import { ArtistModel } from '@/domain/models/artist'

export interface LoadArtistByName {
  loadByName (name: string): Promise<ArtistModel[]>
}
