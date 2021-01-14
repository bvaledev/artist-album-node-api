import { makeDbLoadByArtistNameAlbumFactory } from '@/main/factory/usecases/album/make-db-load-by-album-artist-factory'
import { LoadAlbumByNameController } from '@/presentation/controllers/album/listByName/load-by-name-album-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoadByArtistAlbumValidationComposite } from './load-by-artist-album-validation'
export const makeLoadByArtistAlbumControllerFactory = (): Controller => {
  return new LoadAlbumByNameController(makeLoadByArtistAlbumValidationComposite(), makeDbLoadByArtistNameAlbumFactory())
}
