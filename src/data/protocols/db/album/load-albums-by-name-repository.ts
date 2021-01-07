import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByNameRepository {
    loadByName (name: string): Promise<AlbumModel>
}