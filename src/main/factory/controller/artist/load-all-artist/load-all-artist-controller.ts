import { makeDbLoadAllArtistFactory } from '@/main/factory/usecases/make-db-load-all-artist-factory'
import { ListAllArtistController } from '@/presentation/controllers/artists/listAll/list-all-artist-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadAllArtistControllerFactory = (): Controller => {
  return new ListAllArtistController(makeDbLoadAllArtistFactory())
}
