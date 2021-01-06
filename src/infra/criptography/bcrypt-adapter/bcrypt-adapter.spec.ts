import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await Promise.resolve('hashed_value')
  },
  async compare(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt adapter', () => {
  describe('hash()', () => {
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

  describe('compare()', () => {
    test('Should call Hash with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
  })
})
