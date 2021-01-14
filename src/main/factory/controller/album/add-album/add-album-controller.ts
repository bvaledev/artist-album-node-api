import { AddAlbumController } from '@/presentation/controllers/album/add/add-album-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddAlbumFactory } from '../../../usecases/album/make-db-add-album-factory'
import { makeAddAlbumValidationComposite } from './add-album-validation'

export const makeAddAlbumControllerFactory = (): Controller => {
  return new AddAlbumController(makeAddAlbumValidationComposite(), makeDbAddAlbumFactory())
}
