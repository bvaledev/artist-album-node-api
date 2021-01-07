import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByName {
  loadByName (name: string): Promise<AlbumModel>
}
