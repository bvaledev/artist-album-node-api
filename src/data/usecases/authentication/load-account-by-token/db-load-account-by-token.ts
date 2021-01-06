import { LoadAccountByToken } from '@/domain/usecases/authentication/load-account-by-token'
import { Decrypter } from '@/data/protocols/criptography/dencrypter'
import { UserModel } from '@/domain/models'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/authentication/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async loadByToken(accessToken: string, role?: string): Promise<UserModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
