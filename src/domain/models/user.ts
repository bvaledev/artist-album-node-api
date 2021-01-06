export interface UserModel {
  id: string
  name: string
  email: string
  password: string
  accessToken?: string
  refreshToken?: string
  role?: string
}
