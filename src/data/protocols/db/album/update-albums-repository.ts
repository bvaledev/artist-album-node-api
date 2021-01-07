import { AlbumModel } from '@/domain/models'
import { AddAlbumModel } from '@/domain/usecases/album/add-album'

export interface UpdateAlbumRepository {
    update (id: string, artist: AddAlbumModel): Promise<AlbumModel>
}
