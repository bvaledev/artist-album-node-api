import { makeDbAddAccountFactory } from '@/main/factory/usecases/make-db-add-account-factory'
import { makeDbAuthenticationFactory } from '@/main/factory/usecases/make-db-authentication-factory'
import { SignUpController } from '@/presentation/controllers/authentication/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignupValidationComposite } from './signup-validation'

export const makeSignUpControllerFactory = (): Controller => {
  return new SignUpController(makeSignupValidationComposite(), makeDbAddAccountFactory(), makeDbAuthenticationFactory())
}
