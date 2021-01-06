import { DbAuthentication } from '@/data/usecases/authentication/authenticate/db-authentication'
import { Authentication } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AuthenticateMongoRepository } from '@/infra/db/mongodb/authenticate/authenticate-repository'
import env from '@/main/config/env'

export const makeDbAuthenticationFactory = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const authenticateMongoRepository = new AuthenticateMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(authenticateMongoRepository, bcryptAdapter, jwtAdapter, authenticateMongoRepository)
}
