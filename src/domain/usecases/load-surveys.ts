import { SurveyModel } from '../models/surveys'

export interface LoadSurvey {
  load (): Promise<SurveyModel[]>
}
