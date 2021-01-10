import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { UpdateArtist } from '@/domain/usecases/artists/update-artist'
import { DataExistsError } from '@/presentation/errors'

export class UpdateArtistController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateArtist: UpdateArtist
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const artist = await this.updateArtist.update(httpRequest.params.id, { name: httpRequest.body.name })
      if (!artist) {
        return forbidden(new DataExistsError())
      }

      return ok(artist)
    } catch (error) {
      return serverError(error)
    }
  }
}
