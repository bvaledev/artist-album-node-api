import { Router } from 'express'
import { routeAdapter } from '@/main/adapter/express/express-routes-adapter'
import { makeSignUpControllerFactory } from '@/main/factory/controller/authentication/signup/signup-factory'
import { makeLoginControllerFactory } from '../factory/controller/authentication/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignUpControllerFactory()))
  router.post('/login', routeAdapter(makeLoginControllerFactory()))
}
