import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { MongoHelper } from './mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack: stack,
      date: new Date()
    })
  }
}