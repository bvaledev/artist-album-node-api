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

    test('Should return a true when compare success', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('Should return a false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
      const promise = await sut.compare('any_value', 'any_hash')
      expect(promise).toBe(false)
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((): never => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
