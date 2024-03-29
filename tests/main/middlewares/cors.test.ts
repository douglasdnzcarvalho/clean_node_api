import request from 'supertest'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should enable cors', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
