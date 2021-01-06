import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { UserModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AuthenticateMongoRepository implements AddAccountRepository {
  private readonly collection: string = 'users'
  async add(accountData: AddAccountModel): Promise<UserModel> {
    const accountCollection = await MongoHelper.getCollection(this.collection)
    const account = await accountCollection.insertOne(accountData)
    return MongoHelper.mapper(account.ops[0])
  }
}
