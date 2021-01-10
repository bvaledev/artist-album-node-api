import { AlbumModel } from '@/domain/models'

export interface LoadAlbumByIdRepository {
    loadById (id: string): Promise<AlbumModel>
}