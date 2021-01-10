import { DbUpdateArtist } from '@/data/usecases/artist/update-artist/db-update-artist'
import { ArtistMongoRepository } from '@/infra/db/mongodb/artist/artist-mongo-repository'

export const makeDbUpdateArtistFactory = (): DbUpdateArtist => {
  const artistRepository = new ArtistMongoRepository()
  return new DbUpdateArtist(artistRepository, artistRepository)
}
