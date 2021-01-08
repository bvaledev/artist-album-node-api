import { LoadAlbumByIdRepository } from "@/data/protocols/db/album/load-albums-by-id-repository";
import { AlbumModel } from "@/domain/models";
import { LoadAlbumById } from "@/domain/usecases/album";

export class DbLoadAlbumById implements LoadAlbumById {
    constructor(private readonly loadAlbumByIdRepository: LoadAlbumByIdRepository) {}
    async loadById(id: string): Promise<AlbumModel> {
        return await this.loadAlbumByIdRepository.loadById(id)
    }
}