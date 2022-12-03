import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveyResult (survey_id: String!): SurveyResult! @auth
  }

  extend type Mutation {
    saveSurveyResult (survey_id: String!, answer: String!): SurveyResult! @auth
  }

  type SurveyResult {
    surveyId: String!
    question: String!
    answers: [Answer!]!
    date: DateTime!
  }

  type Answer {
    image: String
    answer: String!
    count: Int!
    percent: Int!
    isCurrentAccountAnswer: Boolean!
  }
`
