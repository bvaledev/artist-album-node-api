import { ArtistModel } from '@/domain/models/artist'

export interface LoadAllArtist {
  loadAll (order: 'ASC' | 'DESC', skip: number, limit: number): Promise<ArtistModel[]>
}
