import express, { Express } from 'express'
import { resolve } from 'path'

export default (app: Express): void => {
  app.use('/public', express.static(resolve(__dirname, '../../public')))
}
