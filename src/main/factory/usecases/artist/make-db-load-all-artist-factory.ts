import { DbLoadAllArtist } from '@/data/usecases/artist/listAll/db-list-all-artist'
import { ArtistMongoRepository } from '@/infra/db/mongodb/artist/artist-mongo-repository'

export const makeDbLoadAllArtistFactory = (): DbLoadAllArtist => {
  const artistRepository = new ArtistMongoRepository()
  return new DbLoadAllArtist(artistRepository)
}
