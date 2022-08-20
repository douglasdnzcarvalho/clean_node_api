import { Collection, MongoClient } from 'mongodb'
import env from '@/main/config/env'

export const MongoHelper = {
  client: undefined as MongoClient,

  async connect (uri?: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(uri ?? env.mongoUrl)

    return this.client
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
