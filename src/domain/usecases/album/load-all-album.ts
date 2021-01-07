import { AlbumModel } from '@/domain/models'

export interface LoadAllAlbum {
  loadAll (order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]>
}
