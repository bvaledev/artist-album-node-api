import { AddAccount } from '@/domain/usecases'
import { EmailInUseError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) { return badRequest(error) }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      // TODO - ADD ACCESS TOKEN WITH ACCOUNT
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
