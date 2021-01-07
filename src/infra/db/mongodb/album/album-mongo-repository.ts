import { AddAlbumRepository } from '@/data/protocols/db/album/add-albums-repository'
import { UpdateAlbumRepository } from '@/data/protocols/db/album/update-albums-repository'
import { AlbumModel } from '@/domain/models'
import { AddAlbumModel, LoadAlbumById } from '@/domain/usecases/album'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AlbumMongoRepository implements AddAlbumRepository, LoadAlbumById, UpdateAlbumRepository {
  private readonly collection: string = 'albums'
  async add(albumData: AddAlbumModel): Promise<AlbumModel> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albumResult = await albumCollection.insertOne(albumData)
    return MongoHelper.mapper(albumResult.ops[0])
  }

  async loadById(id: string): Promise<AlbumModel> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albumResult = await albumCollection.findOne({ id_: id })
    return albumResult && MongoHelper.mapper(albumResult)
  }

  async update(id: string, album: AddAlbumModel): Promise<AlbumModel> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const update = await albumCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...album, artist_id: new ObjectId(album.artist_id) } },
      {
        returnOriginal: false
      })

    if (update.value) {
      return MongoHelper.mapper(update.value)
    }

    return null
  }
}
