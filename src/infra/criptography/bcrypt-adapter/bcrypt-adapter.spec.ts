import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await Promise.resolve('hashed_value')
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt adapter', () => {
  test('Should call Hash with correct values', async () => {
    const sut = makeSut()
    const encryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(encryptSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash sucess', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })
})
