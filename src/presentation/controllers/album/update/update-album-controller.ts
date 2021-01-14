import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { DataExistsError } from '@/presentation/errors'
import { UpdateAlbum } from '@/domain/usecases/album'

export class UpdateAlbumController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateAlbum: UpdateAlbum
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const {
        artist_id,
        cover,
        name,
        year,
        youtube
      } = httpRequest.body

      const album = await this.updateAlbum.update(httpRequest.params.id, {
        artist_id,
        cover,
        name,
        year,
        youtube
      })
      if (!album) {
        return forbidden(new DataExistsError())
      }

      return ok(album)
    } catch (error) {
      return serverError(error)
    }
  }
}
