import { ArtistModel } from "@/domain/models";

export interface DeleteArtistRepository {
    delete (id: string): Promise<boolean>
}