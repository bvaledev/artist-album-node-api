import { makeDbLoadAllAlbumFactory } from '@/main/factory/usecases/album/make-db-load-all-album-factory'
import { ListAllAlbumController } from '@/presentation/controllers/album/listAll/list-all-album-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadAllAlbumControllerFactory = (): Controller => {
  return new ListAllAlbumController(makeDbLoadAllAlbumFactory())
}
