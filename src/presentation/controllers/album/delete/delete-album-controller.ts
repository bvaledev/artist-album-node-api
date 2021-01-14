import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { DeleteAlbum } from '@/domain/usecases/album/delete-album'

export class DeleteAlbumController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteAlbum: DeleteAlbum
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const deleted = await this.deleteAlbum.delete(httpRequest.params.id)
      if (!deleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
