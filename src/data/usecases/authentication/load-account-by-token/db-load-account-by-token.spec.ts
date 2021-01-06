import { Decrypter } from '@/data/protocols/criptography/dencrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

export const mockDecrypterStub = (): Decrypter => {
  class DecripterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecripterStub()
}

interface SutType {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutType => {
  const decrypterStub = mockDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call decripter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
