import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { AddArtist } from '@/domain/usecases/artists/add-artist'
import { DataExistsError } from '@/presentation/errors'

export class AddArtistController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addArtist: AddArtist
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const artist = await this.addArtist.add({ name: httpRequest.body.name })
      if (!artist) {
        return forbidden(new DataExistsError())
      }
      return ok(artist)
    } catch (error) {
      return serverError(error)
    }
  }
}
