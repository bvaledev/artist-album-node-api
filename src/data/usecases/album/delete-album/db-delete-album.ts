import { DeleteAlbumRepository } from "@/data/protocols/db/album/delete-albums-repository"
import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository"
import { DeleteAlbum } from "@/domain/usecases/album"


export class DbDeleteAlbum implements DeleteAlbum {
    constructor(
        private readonly deleteAlbumRepository: DeleteAlbumRepository,
        private readonly loadAlbumByIdRepository: LoadAlbumByIdRepository
    ) {}

    async delete(id: string): Promise<boolean> {
        const albumExists = await this.loadAlbumByIdRepository.loadById(id)
        if(albumExists){
            return this.deleteAlbumRepository.delete(id)
        }
        return null
    }
}