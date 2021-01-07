import { AddArtistRepository } from '@/data/protocols/db/artist/add-artist-repository'
import { DeleteArtistRepository } from '@/data/protocols/db/artist/delete-artist-repository'
import { LoadAllArtistsRepository } from '@/data/protocols/db/artist/list-all-artists-repository'
import { LoadArtistByIdRepository } from '@/data/protocols/db/artist/load-artist-by-id-repository'
import { LoadArtistByNameRepository } from '@/data/protocols/db/artist/load-artist-by-name-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'

export class ArtistMongoRepository implements AddArtistRepository,LoadArtistByIdRepository, LoadArtistByNameRepository, LoadAllArtistsRepository, DeleteArtistRepository {
  private readonly collection: string = 'artists'
  async add(artist: AddArtistModel): Promise<ArtistModel> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.insertOne(artist)
    return MongoHelper.mapper(artistData.ops[0])
  }

  async loadById(id: string): Promise<ArtistModel> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.findOne({ id_: id })
    return artistData && MongoHelper.mapper(artistData)
  }

  async loadByName(name: string): Promise<ArtistModel> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.findOne({ name: new RegExp(name, 'i') })
    return artistData && MongoHelper.mapper(artistData)
  }

  async listAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<ArtistModel[]> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.find({}).skip(skip).limit(limit).sort({ name: order === 'ASC' ? 1 : -1 }).toArray()
    return artistData && MongoHelper.mapperList(artistData)
  }

  async delete(id: string): Promise<boolean> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const action = await artistCollection.deleteOne({ _id: new ObjectId(id) })
    return !!action.result.ok
  }
}
