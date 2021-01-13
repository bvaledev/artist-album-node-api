import { AddAlbumRepository } from "@/data/protocols/db/album/add-albums-repository"
import { LoadAlbumByNameRepository } from "@/data/protocols/db/album/load-albums-by-name-repository"
import { AlbumModel } from "@/domain/models"
import { AddAlbum, AddAlbumModel } from "@/domain/usecases/album"

export class DbAddAlbum implements AddAlbum {
    constructor(
        private readonly addAlbumRepository: AddAlbumRepository,
        private readonly loadAlbumByNameRepository: LoadAlbumByNameRepository
    ) { }
    async add(Album: AddAlbumModel): Promise<AlbumModel> {
        const AlbumExists = await this.loadAlbumByNameRepository.loadByName(Album.name)

        if (!AlbumExists) {
            const data = this.addAlbumRepository.add(Album)
            return data
        }

        return null
    }
}