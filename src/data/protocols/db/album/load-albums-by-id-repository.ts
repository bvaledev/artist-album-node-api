import { AlbumModel } from '@/domain/models'

export interface LoadAddAlbumByIdRepository {
    loadById (id: string): Promise<AlbumModel>
}