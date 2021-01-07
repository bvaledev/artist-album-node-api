import { AlbumModel } from '@/domain/models'
import { AddAlbumModel } from '@/domain/usecases/album';

export interface AddAlbumRepository {
    add(albumData: AddAlbumModel): Promise<AlbumModel>
}