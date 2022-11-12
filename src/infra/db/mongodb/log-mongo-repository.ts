import { LogErrorRepository } from '@/data/protocols/db/log'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack: stack,
      date: new Date()
    })
  }
}
