export interface ArtistModel {
  id: string
  name: string
  userId: string
  albuns?: {
    images: string[]
    name: string
    year?: string
  }
}
