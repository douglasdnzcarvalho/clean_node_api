export const surveyResultSchema = {
  type: 'object',
  properties: {
    survey_id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswer'
      }
    },
    date: {
      type: 'string'
    }
  },
  required: ['survey_id', 'question', 'answers', 'date']
}
