import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { UserModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    protected readonly addAccountRepo: AddAccountRepository
  ) { }

  async add(accountData: AddAccountModel): Promise<UserModel> {
    const account = this.addAccountRepo.add(accountData)
    return account
  }
}
