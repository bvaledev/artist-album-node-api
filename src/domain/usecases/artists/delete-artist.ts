export interface DeleteArtist {
  delete (id: string): Promise<boolean>
}
