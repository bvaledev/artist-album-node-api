import { ArtistModel } from "@/domain/models";
import { AddArtistModel } from "@/domain/usecases/artists/add-artist";

export interface UpdateArtistRepository {
    update (id: string, artist: AddArtistModel): Promise<ArtistModel>
}