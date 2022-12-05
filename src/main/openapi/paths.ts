import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath
} from '@/main/openapi/paths'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{survey_id}/results': surveyResultPath
}
