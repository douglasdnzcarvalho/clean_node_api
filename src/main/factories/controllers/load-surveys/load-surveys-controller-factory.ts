import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
