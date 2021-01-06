import { Decrypter } from '@/data/protocols/criptography/dencrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(
    private readonly secret: string
  ) { }

  async encrypt(id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async decrypt(value: string): Promise<string> {
    const token: any = jwt.verify(value, this.secret)
    return token
  }
}
