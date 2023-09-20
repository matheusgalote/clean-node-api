import env from '../../config/env'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { makeSignUpValidation } from './signup-validation-factory'
import type { Controller } from '../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salting = 12

  const bcryptAdapter = new BcryptAdapter(salting)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)

  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
