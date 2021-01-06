import { MongoHelper as sut } from './mongo-helpers'

describe('Mongodb Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should conect success', async () => {
    await sut.disconnect()
    let client = sut.client
    expect(client).toBeFalsy()
    await sut.connect(sut.url)
    client = sut.client
    expect(client).toBeTruthy()
  })
})
