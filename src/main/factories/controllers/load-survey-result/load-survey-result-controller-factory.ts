import { LoadSurveyResultController } from '@/presentation/controllers/load-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '../../usecases'
import { makeDbCheckSurveyById } from '../../usecases/check-survey-by-id-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
