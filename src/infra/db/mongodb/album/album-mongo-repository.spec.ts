import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { AlbumMongoRepository } from './album-mongo-repository'
import { AddAlbumModel } from '@/domain/usecases/album'
import faker from 'faker/locale/pt_BR'
import { AlbumModel } from '@/domain/models'
let albumCollection: Collection
let artistCollection: Collection

const makeSut = (): AlbumMongoRepository => new AlbumMongoRepository()

const mockAlbumModel = (artistId: ObjectId | string, name?: string): AddAlbumModel => ({
  artist_id: new ObjectId(artistId),
  name: name || faker.database.column(),
  year: faker.date.future(2000).toString(),
  youtube: faker.internet.url(),
  images: [' image_1', 'image_2', 'image_3', 'image_4']
})

const mockArtistInsert = async (): Promise<string> => {
  const artist = await artistCollection.insertOne({
    name: 'Avenged Sevenfold'
  })
  return artist.ops[0]._id
}

const mockAlbumInsert = async (name?: string): Promise<AlbumModel> => {
  const artist = await mockArtistInsert()
  const data = await albumCollection.insertOne({
    artist_id: new ObjectId(artist),
    name: name || faker.database.column(),
    year: faker.date.future(2000).toString(),
    youtube: faker.internet.url(),
    images: [' image_1', 'image_2', 'image_3', 'image_4']
  })
  return MongoHelper.mapper(data.ops[0])
}

// const mockArtistInsertMany = async (): Promise<void> => {
//   const artist = await mockArtistInsert()
//   await albumCollection.insertMany([
//     {
//       artist_id: new ObjectId(artist),
//       name: 'Nightmare',
//       year: '2010',
//       youtube: 'https://www.youtube.com/watch?v=XptslJml1do',
//       images: [' image_1', 'image_2', 'image_3', 'image_4']
//     },
//     {
//       artist_id: new ObjectId(artist),
//       name: 'Hail to the King',
//       year: '2013',
//       youtube: 'https://www.youtube.com/watch?v=8ac0KEUli-Q&list=PLD0fpaGgcqI2RzN6NpslXModT0mJMW3Jl',
//       images: [' image_1', 'image_2', 'image_3', 'image_4']
//     },
//     {
//       artist_id: new ObjectId(artist),
//       name: 'City of Evil',
//       year: '2005',
//       youtube: 'https://www.youtube.com/watch?v=M66jWN9CXV8',
//       images: [' image_1', 'image_2', 'image_3', 'image_4']
//     }
//   ])
// }

describe('AlbumMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    artistCollection = await MongoHelper.getCollection('artists')
    await artistCollection.deleteMany({})
    albumCollection = await MongoHelper.getCollection('albums')
    await albumCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an album on add success', async () => {
      const sut = makeSut()
      const artistId = await mockArtistInsert()
      const album = await sut.add(mockAlbumModel(artistId, 'Nightmare'))
      expect(album).toBeTruthy()
      expect(album.id).toBeTruthy()
      expect(album.name).toBe('Nightmare')
    })
  })

  describe('loadById()', () => {
    test('Should return an album on find by id success', async () => {
      const artistId = await mockArtistInsert()
      const newData = await albumCollection.insertOne(mockAlbumModel(artistId))
      const sut = makeSut()
      const artist = await sut.loadById(newData.ops[0].id)
      expect(artist).toBeTruthy()
      expect(artist.id).toBeTruthy()
    })
  })

  describe('update()', () => {
    test('Should return artist on success update', async () => {
      const sut = makeSut()
      const normalizedData = await mockAlbumInsert()
      const artist = await sut.update(normalizedData.id, mockAlbumModel(normalizedData.artist_id, 'new_name'))
      console.info('update: ', artist)
      console.log(artist)
      expect(artist).toBeTruthy()
      expect(artist.name).toBe('new_name')
    })

    // test('Should return null if update fails', async () => {
    //   const sut = makeSut()
    //   const artist = await sut.update('5ff74f686ff63d0e30e7eba3', { name: 'new_name' })
    //   console.info('update: ', artist)
    //   console.log(artist)
    //   expect(artist).toBeFalsy()
    // })
  })
})
