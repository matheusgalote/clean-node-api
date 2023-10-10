import { type Decrypter } from '../../protocols/criptography/decrypter'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { type LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password'
})

const makeloadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

interface ISut {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): ISut => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeloadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decryper with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  // test('Should return null if Decrypter returns null', async () => {
  //   const { sut, decrypterStub } = makeSut()
  //   jest
  //     .spyOn(decrypterStub, 'decrypt')
  //     .mockReturnValueOnce(new Promise((resolve) => resolve('')))
  //   const account = await sut.load('any_token')
  //   expect(account).toBeNull()
  // })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByToken = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_value', 'any_role')
    expect(loadByToken).toHaveBeenCalledWith('any_value', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })
})
