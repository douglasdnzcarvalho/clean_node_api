import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as MongoClient,

  async connect (url?: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(url ?? process.env.MONGO_URL)

    return this.client
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
