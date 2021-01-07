import { AddAlbumRepository } from '@/data/protocols/db/album/add-albums-repository'
import { AlbumModel } from '@/domain/models'
import { AddAlbumModel } from '@/domain/usecases/album'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AlbumMongoRepository implements AddAlbumRepository {
  private readonly collection: string = 'albums'
  async add(albumData: AddAlbumModel): Promise<AlbumModel> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albumResult = await albumCollection.insertOne(albumData)
    return MongoHelper.mapper(albumResult.ops[0])
  }
}
