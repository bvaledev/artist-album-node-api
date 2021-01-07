import { AddArtistRepository } from '@/data/protocols/db/artist/add-artist-repository'
import { LoadAllArtistsRepository } from '@/data/protocols/db/artist/list-all-artists-repository'
import { LoadArtistByNameRepository } from '@/data/protocols/db/artist/load-artist-by-name-repository'
import { ArtistModel } from '@/domain/models'
import { AddArtistModel } from '@/domain/usecases/artists/add-artist'
import { MongoHelper } from '../helpers/mongo-helpers'

export class ArtistMongoRepository implements AddArtistRepository, LoadArtistByNameRepository, LoadAllArtistsRepository {
  private readonly collection: string = 'artists'
  async add(artist: AddArtistModel): Promise<ArtistModel> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.insertOne(artist)
    return MongoHelper.mapper(artistData.ops[0])
  }

  async loadByName(name: string): Promise<ArtistModel> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    const artistData = await artistCollection.findOne({ name: new RegExp(name, 'i') })
    return artistData && MongoHelper.mapper(artistData)
  }

  async listAll(order: 'ASC' | 'DESC'): Promise<ArtistModel[]> {
    const artistCollection = await MongoHelper.getCollection(this.collection)
    let artistData: ArtistModel[]

    switch (order) {
      case 'ASC':
        artistData = await artistCollection.find({}).sort({ name: 1 }).toArray()
        break
      case 'DESC':
        artistData = await artistCollection.find({}).sort({ name: -1 }).toArray()
        break
    }

    return artistData && MongoHelper.mapperList(artistData)
  }
}
