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

  describe('update()', () => {
    test('Should return artist on success update', async () => {
      const sut = makeSut()
      const newData = await artistCollection.insertOne({ name: 'any_name' })
      const normalizedData = MongoHelper.mapper(newData.ops[0])
      const artist = await sut.update(normalizedData.id, { name: 'new_name' })
      expect(artist).toBeTruthy()
      expect(artist.name).toBe('new_name')
    })

    test('Should return null if update fails', async () => {
      const sut = makeSut()
      const artist = await sut.update('5ff74f686ff63d0e30e7eba3', { name: 'new_name' })
      expect(artist).toBeFalsy()
    })
  })

  describe('loadByName()', () => {
    test('Should return an list of artist on find success', async () => {
      await mockArtistInsertMany()
      const sut = makeSut()
      const artist = await sut.loadByName('bany_2')
      expect(artist.length).toBe(1)
      expect(artist[0].id).toBeTruthy()
      expect(artist[0].name).toBe('bany_2')
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of artist ASC', async () => {
      await mockArtistInsertMany()
      const sut = makeSut()
      const artistList = await sut.listAll('ASC', 5, 5)
      expect(artistList.length).toBe(5)
      expect(artistList[0].name).toBe('fany_6')
    })

    test('Should return a list of artist DESC', async () => {
      await mockArtistInsertMany()
      const sut = makeSut()
      const artistList = await sut.listAll('DESC', 5, 5)
      expect(artistList.length).toBe(5)
      expect(artistList[0].name).toBe('gany_7')
    })
  })

  describe('delete()', () => {
    test('Should return true if deleted', async () => {
      const newData = await artistCollection.insertOne({ name: 'any_name' })
      const normalizedData = MongoHelper.mapper(newData.ops[0])
      const sut = makeSut()
      const deleted = await sut.delete(normalizedData.id)
      expect(deleted).toBe(true)
    })
  })
})
