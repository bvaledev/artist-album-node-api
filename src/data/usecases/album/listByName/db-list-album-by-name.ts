import { LoadAlbumByNameRepository } from "@/data/protocols/db/album/load-albums-by-name-repository";
import { AlbumModel } from "@/domain/models";
import { LoadAlbumByName } from "@/domain/usecases/album";

export class DbLoadAlbumByName implements LoadAlbumByName {
    constructor(private readonly loadAlbumByNameRepository: LoadAlbumByNameRepository) {}
    async loadByName(name: string): Promise<AlbumModel> {
        return await this.loadAlbumByNameRepository.loadByName(name)
    }
}