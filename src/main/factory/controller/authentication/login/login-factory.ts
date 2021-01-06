import { makeDbAuthenticationFactory } from '@/main/factory/usecases/make-db-authentication-factory'
import { LoginController } from '@/presentation/controllers/authentication/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoginValidationComposite } from './login-validation'

export const makeLoginControllerFactory = (): Controller => {
  return new LoginController(makeDbAuthenticationFactory(), makeLoginValidationComposite())
}
