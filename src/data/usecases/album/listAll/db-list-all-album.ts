import { LoadAllAlbumRepository } from "@/data/protocols/db/album/list-all-albums-repository";
import { AlbumModel } from "@/domain/models";
import { LoadAllAlbum } from "@/domain/usecases/album";

export class DbLoadAllAlbum implements LoadAllAlbum {
    constructor(private readonly loadAlbumByNameRepository: LoadAllAlbumRepository) {}
    async loadAll(order: 'ASC' | 'DESC', skip: number, limit: number): Promise<AlbumModel[]> {
        return await this.loadAlbumByNameRepository.listAll(order, skip, limit)
    }
}