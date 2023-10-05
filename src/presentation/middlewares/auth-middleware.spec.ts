import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'hashed_password'
})

const makeLoadAccount = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware(makeLoadAccount())
    const error = await sut.handle({})
    expect(error).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountByTokenStub = makeLoadAccount()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
