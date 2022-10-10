import { adaptRoute } from '@/main/adapters/express'
import { auth } from '@/main/middlewares'
// import { makeLoadSurveyResultController } from '@/main/factories/controllers/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/save-survey-result/save-survey-result-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:survey_id/results', auth, adaptRoute(makeSaveSurveyResultController()))
  // router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
