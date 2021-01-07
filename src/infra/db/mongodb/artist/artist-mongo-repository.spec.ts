import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { ArtistMongoRepository } from './artist-mongo-repository'

let artistCollection: Collection

const mockArtistInsert = async (name: string = 'any_name'): Promise<void> => {
  await artistCollection.insertOne({
    name: name
  })
}

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

  describe('loadByName()', () => {
    test('Should return an artist on find success', async () => {
      mockArtistInsert()
      const sut = makeSut()
      const artist = await sut.loadByName('any_name')
      expect(artist).toBeTruthy()
      expect(artist.id).toBeTruthy()
      expect(artist.name).toBe('any_name')
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of artist ASC', async () => {
      mockArtistInsert('aany_1') // 0
      mockArtistInsert('bany_2') // 1
      mockArtistInsert('cany_3') // 2
      mockArtistInsert('dany_4') // 3
      const sut = makeSut()
      const artistList = await sut.listAll('ASC')
      expect(artistList).toBeTruthy()
      expect(artistList[0].name).toBe('aany_1')
      expect(artistList[3].name).toBe('dany_4')
    })

    test('Should return a list of artist DESC', async () => {
      mockArtistInsert('aany_1') // 3
      mockArtistInsert('bany_2') // 2
      mockArtistInsert('cany_3') // 1
      mockArtistInsert('dany_4') // 0
      const sut = makeSut()
      const artistList = await sut.listAll('DESC')
      expect(artistList).toBeTruthy()
      expect(artistList[0].name).toBe('dany_4')
      expect(artistList[3].name).toBe('aany_1')
    })
  })
})
