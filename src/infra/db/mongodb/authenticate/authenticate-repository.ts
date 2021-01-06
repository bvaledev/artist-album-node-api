import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { UserModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases'

export class AuthenticateMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<UserModel> {
    throw new Error('Method not implemented.')
  }
}
