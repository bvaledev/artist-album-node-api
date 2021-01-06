import { AddAccountModel } from '@/domain/usecases'
import { UserModel } from '@/domain/models'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<UserModel>
}
