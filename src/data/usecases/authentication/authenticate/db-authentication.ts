import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/authentication/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) { }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValidPassword = await this.hashComparer.compare(authentication.password, account.password)
      if (isValidPassword) {
        const accessToken = await this.encrypter.encrypt(account.id)
        return accessToken
      }
    }
    return null
  }
}
