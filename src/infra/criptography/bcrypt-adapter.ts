import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BCryptAdapter implements Encrypter {
    public readonly salt: number

    constructor (salt: number) {
      this.salt = salt
    }

    async encrypt (value: string): Promise<string> {
      const hash = await bcrypt.hash(value, this.salt)

      return hash
    }
}