import { makeDbDeleteAlbumFactory } from '@/main/factory/usecases/album/make-db-delete-album-factory'
import { DeleteAlbumController } from '@/presentation/controllers/album/delete/delete-album-controller'
import { Controller } from '@/presentation/protocols'
import { makeDeleteAlbumValidationComposite } from './delete-album-validation'

export const makeDeleteAlbumControllerFactory = (): Controller => {
  return new DeleteAlbumController(makeDeleteAlbumValidationComposite(), makeDbDeleteAlbumFactory())
}
