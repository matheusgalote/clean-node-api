import { SurveyModel } from "../../../domain/models/surveys"
import { LoadSurvey } from "../../../domain/usecases/load-surveys"
import { LoadSurveysRepository } from "../../protocols/db/survey/load-surveys-repository"

export class DbLoadSurveys implements LoadSurvey {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return []
  }
}
