import { AlbumModel, ArtistModel } from '@/domain/models'

export type AddAlbumModel = {
  artist_id: string
  name: string
  year?: string
  youtube?: string
  images: string[]
  artist?: ArtistModel
}

export interface AddAlbum {
  add (albumData: AddAlbumModel): Promise<AlbumModel>
}
