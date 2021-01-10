import { makeDbUpdateArtistFactory } from '@/main/factory/usecases/make-db-update-artist-factory'
import { UpdateArtistController } from '@/presentation/controllers/artists/update/update-artist-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddArtistValidationComposite } from '../add-artist/add-artist-validation'

export const makeUpdateArtistControllerFactory = (): Controller => {
  return new UpdateArtistController(makeAddArtistValidationComposite(), makeDbUpdateArtistFactory())
}
