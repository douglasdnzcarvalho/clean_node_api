import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadAnswersBySurvey } from '../../usecases/load-answers-by-survey-factory'
import { makeDbSaveSurveyResult } from '../../usecases/save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
