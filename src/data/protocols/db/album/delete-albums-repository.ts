export interface DeleteAlbumRepository {
    delete (id: string): Promise<boolean>
}