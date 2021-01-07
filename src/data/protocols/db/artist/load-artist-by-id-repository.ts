import { ArtistModel } from "@/domain/models";

export interface LoadArtistByIdRepository {
    loadById (id: string): Promise<ArtistModel>
}