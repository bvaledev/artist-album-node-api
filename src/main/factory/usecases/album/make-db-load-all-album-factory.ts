import { DbLoadAllAlbum } from '@/data/usecases/album/list-all/db-list-all-album'
import { AlbumMongoRepository } from '@/infra/db/mongodb/album/album-mongo-repository'

export const makeDbLoadAllAlbumFactory = (): DbLoadAllAlbum => {
  const albumRepository = new AlbumMongoRepository()
  return new DbLoadAllAlbum(albumRepository)
}
