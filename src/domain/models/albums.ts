import { ArtistModel } from '@/domain/models'

export interface AlbumModel {
  artist_id: string
  name: string
  year?: string
  youtube?: string
  images: string[]
  artist?: ArtistModel
}
