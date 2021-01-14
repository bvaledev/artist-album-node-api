import { DbAddAlbum } from '@/data/usecases/album/add-album/db-add-album'
import { AlbumMongoRepository } from '@/infra/db/mongodb/album/album-mongo-repository'

export const makeDbAddAlbumFactory = (): DbAddAlbum => {
  const albumRepository = new AlbumMongoRepository()
  return new DbAddAlbum(albumRepository, albumRepository)
}
