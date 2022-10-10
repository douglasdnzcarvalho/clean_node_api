import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadAnswersBySurvey } from '@/domain/usecases'
import { DbLoadAnswersBySurvey } from '@/data/usecases/db-load-answers-by-survey'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
