import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/authentication/load-account-by-email-repository'
import { UserModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    protected readonly hash: Hasher,
    protected readonly addAccountRepo: AddAccountRepository,
    protected readonly loadAccountByEmailRepo: LoadAccountByEmailRepository
  ) { }

  async add(accountData: AddAccountModel): Promise<UserModel> {
    const accountExists = await this.loadAccountByEmailRepo.loadByEmail(accountData.email)
    if (!accountExists) {
      const hashedPass = await this.hash.hash(accountData.password)
      const hashedAccount = Object.assign({}, accountData, { password: hashedPass })
      const account = this.addAccountRepo.add(hashedAccount)
      return account
    }
    return null
  }
}
