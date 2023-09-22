import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../use-cases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../use-cases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../use-cases/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
