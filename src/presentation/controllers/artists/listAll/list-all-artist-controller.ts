import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadAllArtist } from '@/domain/usecases/artists/load-all-artist'

export class ListAllArtistController implements Controller {
  constructor(
    private readonly loadAllArtist: LoadAllArtist
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { order, page , limit } = httpRequest.query
      const artists = await this.loadAllArtist.loadAll(order.toUpperCase(), (page - 1) * limit, limit)
      if (!artists || artists.length < 1) {
        return noContent()
      }
      return ok(artists)
    } catch (error) {
      return serverError(error)
    }
  }
}
