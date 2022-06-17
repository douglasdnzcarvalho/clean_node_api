export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://database:27017/clean-node-api',
  port: (process.env.PORT ? Number(process.env.PORT) : 5050),
  jwtSecret: process.env.JWT_SECRET || 'JWT-2022'
}
