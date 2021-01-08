import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByArtistRepository {
    loadByArtist(artistName: string, order?: 'ASC' | 'DESC', skip?: number, limit?: number): Promise<AlbumModel[]>
}