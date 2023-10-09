import { type Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decryper with correct values', async () => {
    const decrypterStub = makeDecrypter()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
