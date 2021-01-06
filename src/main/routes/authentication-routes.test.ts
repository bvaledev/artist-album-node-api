import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let authCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    authCollection = await MongoHelper.getCollection('users')
    await authCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app).post('/api/signup')
        .send({
          name: 'Brendo',
          email: 'brendo2@brendo.me',
          password: '123456789',
          passwordConfirmation: '123456789'
        }).expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const passwordhash = await hash('123456789', 12)
      await authCollection.insertOne({
        name: 'Brendo',
        email: 'brendo@brendo.me',
        password: passwordhash
      })
      await request(app).post('/api/login')
        .send({
          email: 'brendo@brendo.me',
          password: '123456789'
        })
        .expect(200)
    })

    test('Should return 401 on login fail', async () => {
      await request(app).post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
