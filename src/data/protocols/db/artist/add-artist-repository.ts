import { ArtistModel } from "@/domain/models";
import { AddArtistModel } from "@/domain/usecases/artists/add-artist";

export interface AddArtistRepository {
    add (artist: AddArtistModel): Promise<ArtistModel>
}