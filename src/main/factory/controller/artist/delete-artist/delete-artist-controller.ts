import { makeDbDeleteArtistFactory } from '@/main/factory/usecases/artist/make-db-delete-artist-factory'
import { DeleteArtistController } from '@/presentation/controllers/artists/delete/delete-artist-controller'
import { Controller } from '@/presentation/protocols'
import { makeDeleteArtistValidationComposite } from './delete-artist-validation'

export const makeDeleteArtistControllerFactory = (): Controller => {
  return new DeleteArtistController(makeDeleteArtistValidationComposite(), makeDbDeleteArtistFactory())
}
