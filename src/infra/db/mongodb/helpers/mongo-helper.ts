import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as MongoClient,

  async connect (url: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(url)

    return this.client
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
