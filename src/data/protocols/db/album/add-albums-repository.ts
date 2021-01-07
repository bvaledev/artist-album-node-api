import { AlbumModel } from '@/domain/models'
import { AddAlbum } from '@/domain/usecases/album/add-album'

export interface AddAlbumRepository {
    add (albumData: AddAlbum): Promise<AlbumModel>
}