import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurvey } from '../../../../domain/usecases/load-surveys'
import { DbLoadSurveys } from '../../../../data/usecases/load-survetys/db-load-surveys'

export const makeDbLoadSurveys = (): LoadSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
