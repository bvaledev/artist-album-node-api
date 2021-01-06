import { UserModel } from '@/domain/models'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<UserModel>
}
