import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { Collection } from 'mongodb'

let artistCollection: Collection

describe('Artist Routes', () => {
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

  describe('POST /artist/add', () => {
    test('Should return 200 on add artist', async () => {
      await request(app).post('/api/artist/add')
        .send({
          name: 'any_artist'
        }).expect(200)
    })
  })
})
