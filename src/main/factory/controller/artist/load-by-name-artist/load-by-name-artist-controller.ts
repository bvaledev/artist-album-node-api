import { makeDbLoadByNameArtistFactory } from '@/main/factory/usecases/artist/make-db-load-by-name-artist-factory'
import { LoadArtistByNameController } from '@/presentation/controllers/artists/listByName/load-by-name-artist-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoadByNameArtistValidationComposite } from './load-by-name-artist-validation'
export const makeLoadByNameArtistControllerFactory = (): Controller => {
  return new LoadArtistByNameController(makeLoadByNameArtistValidationComposite(), makeDbLoadByNameArtistFactory())
}
