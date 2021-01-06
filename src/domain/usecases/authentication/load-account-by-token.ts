import { UserModel } from '@/domain/models'

export interface LoadAccountByToken {
  loadByToken(accessToken: string, role?: string): Promise<UserModel>
}
