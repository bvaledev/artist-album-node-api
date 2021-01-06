import { LoadAccountByToken } from '@/domain/usecases/authentication/load-account-by-token'
import { Decrypter } from '@/data/protocols/criptography/dencrypter'
import { UserModel } from '@/domain/models'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter
  ) { }

  async loadByToken(accessToken: string, role?: string): Promise<UserModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
