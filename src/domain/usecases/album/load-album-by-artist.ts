import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByArtist {
  loadByArtist (artistName: string): Promise<AlbumModel>
}
