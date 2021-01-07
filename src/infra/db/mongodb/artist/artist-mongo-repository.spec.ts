import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { ArtistMongoRepository } from './artist-mongo-repository'

let artistCollection: Collection

const mockArtistInsert = async (name: string = 'any_name'): Promise<void> => {
  await artistCollection.insertOne({
    name: name
  })
}

const mockArtistInsertMany = async (): Promise<void> => {
  await mockArtistInsert('aany_1')
  await mockArtistInsert('bany_2')
  await mockArtistInsert('cany_3')
  await mockArtistInsert('dany_4')
  await mockArtistInsert('eany_5')
  await mockArtistInsert('fany_6')
  await mockArtistInsert('gany_7')
  await mockArtistInsert('hany_8')
  await mockArtistInsert('iany_9')
  await mockArtistInsert('jany_10')
  await mockArtistInsert('kany_11')
  await mockArtistInsert('lany_12')
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

  describe('loadById()', () => {
    test('Should return an artist on find by id success', async () => {
      const newData = await artistCollection.insertOne({ name: 'any_name' })
      const sut = makeSut()
      const artist = await sut.loadById(newData.ops[0].id)
      expect(artist).toBeTruthy()
      expect(artist.id).toBeTruthy()
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
      await mockArtistInsertMany()
      const sut = makeSut()
      const artistList = await sut.listAll('ASC',5, 5)
      expect(artistList.length).toBe(5)
      expect(artistList[0].name).toBe('fany_6')
    })

    test('Should return a list of artist DESC', async () => {
      await mockArtistInsertMany()
      const sut = makeSut()
      const artistList = await sut.listAll('DESC',5, 5)
      expect(artistList.length).toBe(5)
      expect(artistList[0].name).toBe('gany_7')
    })
  })

  describe('delete()', () => {
    test('Should return true if deleted', async () => {
      const data = await (await artistCollection.insertOne({ name: 'any_name' })).ops[0]
      const sut = makeSut()
      const deleted = await sut.delete(data._id)
      expect(deleted).toBe(true)
    })
  })
})
