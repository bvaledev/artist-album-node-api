import { ObjectId } from 'mongodb'

export interface ArtistModel {
  id: string
  name: string
  userId: ObjectId | String
  albuns?: {
    images: string[]
    name: string
    year?: string
  }
}
