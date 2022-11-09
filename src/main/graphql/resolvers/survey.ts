import { adaptResolver } from '@/main/adapters/apollo-server'
import { makeLoadSurveysController } from '@/main/factories/controllers/load-surveys/load-surveys-controller-factory'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => await adaptResolver(makeLoadSurveysController(), args, context)
  }
}
