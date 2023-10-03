import type { Controller } from '../../../presentation/protocols'
import { makeLogControllerDecorator } from '../use-cases/decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../presentation/controllers/suvery/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../use-cases/add-survey/db-add-account-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
