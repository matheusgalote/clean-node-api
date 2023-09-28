import type { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddSurveyRepositoryStub()
}

interface ISut {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): ISut => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyReposiry with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeSurvey())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurvey())
  })

  test('Should throw if addSurveyRepositoryStub throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.add(makeFakeSurvey())
    await expect(promise).rejects.toThrow()
  })
})
