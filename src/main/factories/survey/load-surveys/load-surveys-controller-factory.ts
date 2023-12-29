import type { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../use-cases/decorators/log-controller-decorator-factory'
import { LoadSurveysContoller } from '../../../../presentation/controllers/suvery/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../../use-cases/load-surveys/db-load-surveys'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysContoller(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
