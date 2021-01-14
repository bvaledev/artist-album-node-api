import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { Collection } from 'mongodb'

let albumCollection: Collection

describe('Album Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    albumCollection = await MongoHelper.getCollection('albums')
    await albumCollection.deleteMany({})
  })

  describe('POST /album/add', () => {
    test('Should return 200 on add album', async () => {
      const album = {
        artist_id: 'any_name',
        name: 'any_name',
        cover: 'any_name'
      }

      await request(app).post('/api/album/add').send(album).expect(200)
    })
  })
})
