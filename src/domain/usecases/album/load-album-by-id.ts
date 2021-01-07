import { AlbumModel } from '@/domain/models'

export interface LoadAlbumById {
  loadById (id: string): Promise<AlbumModel>
}
