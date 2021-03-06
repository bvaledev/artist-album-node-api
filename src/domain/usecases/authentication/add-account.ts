import { UserModel } from '@/domain/models'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<UserModel>
}
