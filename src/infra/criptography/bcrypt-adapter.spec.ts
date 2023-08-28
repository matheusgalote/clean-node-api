import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('valid_hash') })
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('Should return a vailid hash on hash success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('any_value')

    expect(hash).toBe('valid_hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toBeCalledWith('any_value', 'any_hash')
  })

  test('Should return a vailid hash on hash success', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if compare fails', async () => {
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => false)
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
