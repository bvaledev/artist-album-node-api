import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { Collection } from 'mongodb'
import { AuthenticateMongoRepository } from './authenticate-repository'

let authCollection: Collection

describe('Authenticate Mongo Repository', () => {
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

  const makeSut = (): AuthenticateMongoRepository => {
    return new AuthenticateMongoRepository()
  }

  test('', () => {

  })
})
