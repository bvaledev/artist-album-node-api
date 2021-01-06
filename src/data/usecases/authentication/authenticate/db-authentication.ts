import { LoadAccountByEmailRepository } from '@/data/protocols/db/authentication/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
