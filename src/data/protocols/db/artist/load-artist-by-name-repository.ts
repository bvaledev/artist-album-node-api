import { ArtistModel } from "@/domain/models";

export interface LoadArtistByNameRepository {
    loadByName (name: string): Promise<ArtistModel[]>
}