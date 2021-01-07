export interface DeleteAlbum {
  delete (id: string): Promise<boolean>
}
