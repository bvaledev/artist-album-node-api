import { UserModel } from '@/domain/models'

export interface LoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<UserModel>
}
