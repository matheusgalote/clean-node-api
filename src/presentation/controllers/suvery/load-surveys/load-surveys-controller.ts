import { ok, serverError } from "../../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse, LoadSurvey } from "./load-surveys-controller-protocols"

export class LoadSurveysContoller implements Controller {
  constructor (private readonly loadSurveys: LoadSurvey) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
