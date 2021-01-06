import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { UserModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    protected readonly hash: Hasher,
    protected readonly addAccountRepo: AddAccountRepository
  ) { }

  async add(accountData: AddAccountModel): Promise<UserModel> {
    await this.hash.hash(accountData.password)
    const account = this.addAccountRepo.add(accountData)
    return account
  }
}
