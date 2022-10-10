import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { CheckSurveyById, LoadSurveyResult } from '@/domain/usecases'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const surveyId = request.params.survey_id
      const exists = await this.checkSurveyById.checkById(surveyId)
      if (!exists) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, request.accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export interface Request extends HttpRequest {
    params?: {
      'survey_id'?: string
    }
  }
}
