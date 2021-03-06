import { ObjectId } from 'mongodb'
import { AddAlbumRepository } from '@/data/protocols/db/album/add-albums-repository'
import { LoadAllAlbumRepository } from '@/data/protocols/db/album/list-all-albums-repository'
import { UpdateAlbumRepository } from '@/data/protocols/db/album/update-albums-repository'
import { AlbumModel } from '@/domain/models'
import { AddAlbumModel } from '@/domain/usecases/album'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { LoadAlbumByArtistRepository } from '@/data/protocols/db/album/load-albums-by-artist-repository'
import { DeleteAlbumRepository } from '@/data/protocols/db/album/delete-albums-repository'
import { LoadAlbumByIdRepository } from '@/data/protocols/db/album/load-albums-by-id-repository'
import { LoadAlbumByNameRepository } from '@/data/protocols/db/album/load-albums-by-name-repository'

export class AlbumMongoRepository implements AddAlbumRepository, LoadAlbumByIdRepository, LoadAllAlbumRepository, UpdateAlbumRepository, LoadAlbumByNameRepository, LoadAlbumByArtistRepository, DeleteAlbumRepository {
  private readonly collection: string = 'albums'

  async listAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albumResult = await albumCollection.find({}).skip(skip).limit(limit).sort({ name: order === 'ASC' ? 1 : -1 }).toArray()
    return albumResult && MongoHelper.mapperList(albumResult)
  }

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

  async loadByName(name: string): Promise<AlbumModel> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albumResult = await albumCollection.findOne({ name: new RegExp(name, 'i') })
    return albumResult && MongoHelper.mapper(albumResult)
  }

  async loadByArtist(artistName: string, order: 'ASC' | 'DESC' = 'ASC', skip: number = 0, limit: number = 10): Promise<AlbumModel[]> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const albums = await albumCollection.aggregate([
      {
        $lookup: {
          from: 'artists',
          localField: 'artist_id',
          foreignField: '_id',
          as: 'artist'
        }
      },
      {
        $project: {
          artist_id: 0,
          'artist._id': 0
        }
      },
      {
        $unwind: '$artist'
      }, {
        $match: {
          'artist.name': new RegExp(artistName, 'i')
        }
      }
    ]).skip(skip)
      .limit(limit)
      .sort({ name: order === 'ASC' ? 1 : -1 })
      .toArray()

    return albums && MongoHelper.mapperList(albums)
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

  async delete(id: string): Promise<boolean> {
    const albumCollection = await MongoHelper.getCollection(this.collection)
    const action = await albumCollection.deleteOne({ _id: new ObjectId(id) })
    return !!action.result.ok
  }
}
