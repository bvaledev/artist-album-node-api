import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadAllAlbum } from '@/domain/usecases/album/load-all-album'

export class ListAllAlbumController implements Controller {
  constructor(
    private readonly loadAllAlbum: LoadAllAlbum
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { order, page , limit } = httpRequest.query
      const album = await this.loadAllAlbum.loadAll(order.toUpperCase(), (page - 1) * limit, limit)
      if (!album || album.length < 1) {
        return noContent()
      }
      return ok(album)
    } catch (error) {
      return serverError(error)
    }
  }
}
