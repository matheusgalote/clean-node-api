import { type AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../../../../domain/models/surveys'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] | any[] = await surveyCollection.find().toArray()
    return surveys
  }
}
