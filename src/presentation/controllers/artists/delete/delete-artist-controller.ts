import { badRequest, noContent, notFound, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { DeleteArtist } from '@/domain/usecases/artists/delete-artist'

export class DeleteArtistController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteArtist: DeleteArtist
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const deleted = await this.deleteArtist.delete(httpRequest.params.id)
      if (!deleted) {
        return notFound()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
