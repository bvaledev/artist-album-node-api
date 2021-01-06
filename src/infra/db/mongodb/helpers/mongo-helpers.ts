import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,
  async connect(url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getCollection(name: string): Promise<Collection> {
    if (this.client === null || !this.client.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },
  mapper(collection: any): any {
    const { _id, ...dataWithOutId } = collection
    return Object.assign({}, dataWithOutId, { id: _id })
  },
  mapperList(collection: any[]): any[] {
    return collection.map(c => MongoHelper.mapper(c))
  }
}
