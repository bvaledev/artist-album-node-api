import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await Promise.resolve('any_token')
  },
  async verify(): Promise<string> {
    return await Promise.resolve('any_token')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
  })

  describe('verify()', () => {
  })
})
