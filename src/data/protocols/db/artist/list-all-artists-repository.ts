import { ArtistModel } from "@/domain/models";

export interface LoadAllArtistsRepository {
    listAll (order: 'ASC' | 'DESC', skip: number, limit: number): Promise<ArtistModel[]>
}