import { LoadAlbumByArtistRepository } from "@/data/protocols/db/album/load-albums-by-artist-repository";
import { AlbumModel } from "@/domain/models";
import { LoadAlbumByArtist } from "@/domain/usecases/album/load-album-by-artist";

export class DbLoadAlbumByArtist implements LoadAlbumByArtist {
    constructor(private readonly loadAlbumByArtistRepository: LoadAlbumByArtistRepository) {}
    async loadByArtist(artistName: string, order?: "ASC" | "DESC", skip?: number, limit?: number): Promise<AlbumModel[]> {
        return await this.loadAlbumByArtistRepository.loadByArtist(artistName)
    }
}