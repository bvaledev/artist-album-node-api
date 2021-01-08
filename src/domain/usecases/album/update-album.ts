import { AlbumModel } from '@/domain/models'
import { AddAlbumModel } from '@/domain/usecases/album/add-album'

export interface UpdateAlbum {
  update(id: string, album: AddAlbumModel): Promise<AlbumModel>
}
