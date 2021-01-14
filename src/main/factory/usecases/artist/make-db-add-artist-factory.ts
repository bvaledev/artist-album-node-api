import { DbAddArtist } from '@/data/usecases/artist/add-artist/db-add-artist'
import { ArtistMongoRepository } from '@/infra/db/mongodb/artist/artist-mongo-repository'

export const makeDbAddArtistFactory = (): DbAddArtist => {
  const artistRepository = new ArtistMongoRepository()
  return new DbAddArtist(artistRepository, artistRepository)
}
