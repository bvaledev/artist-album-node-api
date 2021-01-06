import { AddAccount } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body
    await this.addAccount.add({
      name,
      email,
      password
    })

    return null
  }
}
