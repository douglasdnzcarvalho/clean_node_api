import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from '@/main/config/env'

MongoHelper.connect()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
