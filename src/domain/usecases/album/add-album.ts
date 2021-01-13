import { AlbumModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

export type AddAlbumModel = {
  artist_id: string | ObjectId
  name: string
  year?: string
  youtube?: string
  cover: string
}

export interface AddAlbum {
  add(albumData: AddAlbumModel): Promise<AlbumModel>
}
