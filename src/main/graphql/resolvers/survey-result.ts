import { adaptResolver } from '@/main/adapters/apollo-server'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/save-survey-result/save-survey-result-controller-factory'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => await adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => await adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
