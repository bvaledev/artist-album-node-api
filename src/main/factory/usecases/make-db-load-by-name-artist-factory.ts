import { DbLoadArtistByName } from '@/data/usecases/artist/listByName/db-list-artist-by-name'
import { ArtistMongoRepository } from '@/infra/db/mongodb/artist/artist-mongo-repository'

export const makeDbLoadByNameArtistFactory = (): DbLoadArtistByName => {
  const artistRepository = new ArtistMongoRepository()
  return new DbLoadArtistByName(artistRepository)
}
