import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { ArtistMongoRepository } from './artist-mongo-repository'

let artistCollection: Collection

const makeSut = (): ArtistMongoRepository => new ArtistMongoRepository()

describe('ArtistMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    artistCollection = await MongoHelper.getCollection('artists')
    await artistCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an artist on add success', async () => {
      const sut = makeSut()
      const artist = await sut.add({
        name: 'any_name'
      })
      expect(artist).toBeTruthy()
      expect(artist.id).toBeTruthy()
      expect(artist.name).toBe('any_name')
    })
  })
})
