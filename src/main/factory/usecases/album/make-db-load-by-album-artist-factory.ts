import { DbLoadAlbumByName } from '@/data/usecases/album/listByName/db-list-album-by-name'
import { AlbumMongoRepository } from '@/infra/db/mongodb/album/album-mongo-repository'

export const makeDbLoadByNameAlbumFactory = (): DbLoadAlbumByName => {
  const albumRepository = new AlbumMongoRepository()
  return new DbLoadAlbumByName(albumRepository)
}
