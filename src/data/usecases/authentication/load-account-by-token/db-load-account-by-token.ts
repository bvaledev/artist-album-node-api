import { LoadAccountByToken } from '@/domain/usecases/authentication/load-account-by-token'
import { Decrypter } from '@/data/protocols/criptography/dencrypter'
import { UserModel } from '@/domain/models'
import { mockAccountModel } from '@/data/test'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter
  ) { }

  async loadByToken(accessToken: string, role?: string): Promise<UserModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      return mockAccountModel()
    }
    return null
  }
}
