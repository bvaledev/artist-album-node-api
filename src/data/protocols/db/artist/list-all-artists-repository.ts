import { ArtistModel } from "@/domain/models";

export interface LoadAllArtistsRepository {
    listAll (order: 'ASC' | 'DESC'): Promise<ArtistModel[]>
}