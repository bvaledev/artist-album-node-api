import { makeDbLoadByArtistNameAlbumFactory } from '@/main/factory/usecases/album/make-db-load-by-album-artist-factory'
import { LoadAlbumByNameController } from '@/presentation/controllers/album/listByName/load-by-name-album-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoadByNameAlbumValidationComposite } from './load-by-name-album-validation'
export const makeLoadByNameAlbumControllerFactory = (): Controller => {
  return new LoadAlbumByNameController(makeLoadByNameAlbumValidationComposite(), makeDbLoadByArtistNameAlbumFactory())
}
