import { apiKeyAuthSchema } from '@/main/openapi/schemas'
import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
} from '@/main/openapi/components'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
