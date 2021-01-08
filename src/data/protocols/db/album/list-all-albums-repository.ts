import { AlbumModel } from '@/domain/models'

export interface LoadAllAlbumRepository {
    listAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]>
}