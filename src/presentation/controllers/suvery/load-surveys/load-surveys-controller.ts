import { Controller, HttpRequest, HttpResponse, LoadSurvey } from "./load-surveys-controller-protocols"

export class LoadSurveysContoller implements Controller {
  constructor (private readonly loadSurveys: LoadSurvey) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
