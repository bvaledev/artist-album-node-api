import { AlbumModel } from '@/domain/models'

export interface LoadAllAddAlbumRepositoryRepository {
    listAll (order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]>
}