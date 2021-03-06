import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { LoadAlbumByName } from '@/domain/usecases/album/load-album-by-name'

export class LoadAlbumByNameController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAlbumByName: LoadAlbumByName
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name } = httpRequest.body
      const albumList = await this.loadAlbumByName.loadByName(name)
      if (!albumList) {
        return noContent()
      }
      return ok(albumList)
    } catch (error) {
      return serverError(error)
    }
  }
}
