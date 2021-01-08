import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository"
import { UpdateAlbumRepository } from "@/data/protocols/db/album/update-albums-repository"
import { AlbumModel } from "@/domain/models"
import { UpdateAlbum, AddAlbumModel } from "@/domain/usecases/album"

export class DbUpdateAlbum implements UpdateAlbum {
    constructor(
        private readonly updateAlbumRepository: UpdateAlbumRepository,
        private readonly loadAlbumByIdRepository: LoadAlbumByIdRepository
    ) {}
    async update(id: string, album: AddAlbumModel): Promise<AlbumModel> {
        const albumExists = await this.loadAlbumByIdRepository.loadById(id)
        if(!albumExists){
            return this.updateAlbumRepository.update(id, album)
        }
        return null
    }
}