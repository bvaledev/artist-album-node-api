import { DbDeleteAlbum } from '@/data/usecases/album/delete-album/db-delete-album'
import { AlbumMongoRepository } from '@/infra/db/mongodb/album/album-mongo-repository'

export const makeDbDeleteAlbumFactory = (): DbDeleteAlbum => {
  const albumRepository = new AlbumMongoRepository()
  return new DbDeleteAlbum(albumRepository, albumRepository)
}
