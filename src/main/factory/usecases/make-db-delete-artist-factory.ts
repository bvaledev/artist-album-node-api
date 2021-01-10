import { DbDeleteArtist } from '@/data/usecases/artist/delete-artist/db-delete-artist'
import { ArtistMongoRepository } from '@/infra/db/mongodb/artist/artist-mongo-repository'

export const makeDbDeleteArtistFactory = (): DbDeleteArtist => {
  const artistRepository = new ArtistMongoRepository()
  return new DbDeleteArtist(artistRepository, artistRepository)
}
