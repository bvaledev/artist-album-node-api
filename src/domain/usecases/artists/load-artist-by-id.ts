import { ArtistModel } from '@/domain/models/artist'

export interface LoadArtistById {
  loadById (id: string): Promise<ArtistModel>
}
