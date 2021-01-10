import { AddArtistController } from '@/presentation/controllers/artists/add/add-artist-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddArtistFactory } from '../../usecases/make-db-add-artist-factory'
import { makeAddArtistValidationComposite } from './add-artist-validation'

export const makeAddArtistControllerFactory = (): Controller => {
  return new AddArtistController(makeAddArtistValidationComposite(), makeDbAddArtistFactory())
}
