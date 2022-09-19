import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Hasher } from '@/data/protocols/criptography/hasher'

import faker from 'faker'

export class EncrypterSpy implements Encrypter {
  plaintext: string
  encryptedText = faker.datatype.uuid()

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.encryptedText
  }
}

export class HasherSpy implements Hasher {
  plaintext: string
  hashedText = faker.datatype.uuid()

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.hashedText
  }
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}
