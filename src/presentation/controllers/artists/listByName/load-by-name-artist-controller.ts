import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { LoadArtistByName } from '@/domain/usecases/artists/load-artist-by-name'

export class LoadArtistByNameController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadArtistByName: LoadArtistByName
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name } = httpRequest.body
      const artistList = await this.loadArtistByName.loadByName(name)
      if (!artistList) {
        return noContent()
      }
      return ok(artistList)
    } catch (error) {
      return serverError(error)
    }
  }
}
