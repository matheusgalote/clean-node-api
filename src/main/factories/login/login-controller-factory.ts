import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../use-cases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../use-cases/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
