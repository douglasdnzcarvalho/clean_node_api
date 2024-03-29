import { adaptResolver } from '@/main/adapters/apollo-server'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => await adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => await adaptResolver(makeSignUpController(), args)
  }
}
