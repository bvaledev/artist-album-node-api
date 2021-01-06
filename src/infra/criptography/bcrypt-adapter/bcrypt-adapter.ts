import { Hasher } from '@/data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) { }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return await Promise.resolve(hash)
  }
}