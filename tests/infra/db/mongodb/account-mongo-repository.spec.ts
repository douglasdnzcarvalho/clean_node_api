import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection, ObjectId } from 'mongodb'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    await accountCollection.insertOne(mockAddAccountParams())

    const sut = new AccountMongoRepository()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const newAccount = await accountCollection.insertOne(mockAddAccountParams())
    const newId = newAccount.insertedId.toHexString()

    const sut = new AccountMongoRepository()
    await sut.updateAccessToken(newId, 'any_token')

    const account = await accountCollection.findOne({ _id: new ObjectId(newId) })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
