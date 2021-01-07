import { ArtistModel } from '@/domain/models'

export interface AlbumModel {
  id: string
  artist_id: string
  name: string
  year?: string
  youtube?: string
  images: string[]
  artist?: ArtistModel
}
