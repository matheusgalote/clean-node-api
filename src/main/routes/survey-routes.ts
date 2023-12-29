import type { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/survey/add-survey-controller-factory'
import { makeLoadSurveyController } from '../factories/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth, auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveyController()))
}
