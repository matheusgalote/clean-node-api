import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise((resolve) => { resolve('hash_256_password') })
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accoutnData = {
      name: 'valid_name',
      email: 'valid_email@.com',
      password: 'valid_password'
    }
    await sut.add(accoutnData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
