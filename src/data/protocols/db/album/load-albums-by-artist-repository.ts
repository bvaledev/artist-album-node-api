import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByArtistRepository {
    loadByArtist (name: string): Promise<AlbumModel>
}