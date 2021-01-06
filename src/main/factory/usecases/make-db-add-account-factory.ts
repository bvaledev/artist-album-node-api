import { DbAddAccount } from '@/data/usecases/authentication/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AuthenticateMongoRepository } from '@/infra/db/mongodb/authenticate/authenticate-repository'

export const makeDbAddAccountFactory = (): DbAddAccount => {
  const authenticateMongoRepository = new AuthenticateMongoRepository()
  const hasher = new BcryptAdapter(12)
  return new DbAddAccount(hasher, authenticateMongoRepository, authenticateMongoRepository)
}
