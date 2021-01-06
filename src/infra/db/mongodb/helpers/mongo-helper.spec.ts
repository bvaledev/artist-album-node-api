import { MongoHelper as sut } from './mongo-helpers'

const mockCollectionData = (): any => ({
  _id: 'any_id',
  name: 'any_name'
})

const mockCollectionListData = (): any[] => ([
  mockCollectionData(),
  mockCollectionData(),
  mockCollectionData(),
  mockCollectionData(),
  mockCollectionData()
])

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

  test('Should reconnect if mongodb down', async () => {
    let accountconnection = await sut.getCollection('accounts')
    expect(accountconnection).toBeTruthy()
    await sut.disconnect()
    accountconnection = await sut.getCollection('accounts')
    expect(accountconnection).toBeTruthy()
  })

  test('Should map a collection correctly', () => {
    const collection = sut.mapper(mockCollectionData())
    expect(collection.id).toBeTruthy()
  })

  test('Should map a collection list', () => {
    const collectionList = sut.mapperList(mockCollectionListData())
    expect(collectionList[2].id).toBeTruthy()
  })
})
