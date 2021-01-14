import { makeDbUpdateAlbumFactory } from '@/main/factory/usecases/album/make-db-update-album-factory'
import { UpdateAlbumController } from '@/presentation/controllers/album/update/update-album-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddAlbumValidationComposite } from '../add-album/add-album-validation'

export const makeUpdateAlbumControllerFactory = (): Controller => {
  return new UpdateAlbumController(makeAddAlbumValidationComposite(), makeDbUpdateAlbumFactory())
}
