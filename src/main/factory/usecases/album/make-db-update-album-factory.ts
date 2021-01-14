import { DbUpdateAlbum } from '@/data/usecases/album/update-album/db-update-album'
import { AlbumMongoRepository } from '@/infra/db/mongodb/album/album-mongo-repository'

export const makeDbUpdateAlbumFactory = (): DbUpdateAlbum => {
  const albumRepository = new AlbumMongoRepository()
  return new DbUpdateAlbum(albumRepository, albumRepository)
}
