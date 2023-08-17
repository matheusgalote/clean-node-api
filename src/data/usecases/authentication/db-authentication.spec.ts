import { type AuthenticationModel } from '../../../domain/usecases/authentication'
import { type LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeFakeAuth = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepository implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepository()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepository: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepository)

  return {
    sut,
    loadAccountByEmailRepository
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
    await sut.auth(makeFakeAuth())

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should throw LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    jest.spyOn(loadAccountByEmailRepository, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth(makeFakeAuth())

    await expect(promise).rejects.toThrow()
  })
})
