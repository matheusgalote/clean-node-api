import { LoadSurveysContoller } from './load-surveys-controller'
import { LoadSurvey, SurveyModel } from './load-surveys-controller-protocols'
import { reset, set } from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer'
        }
      ],
      date: new Date()
    }
  ]
}

interface SutTypes {
  sut: LoadSurveysContoller
  loadSurveysStub: LoadSurvey
}

const makeLoadSurveys = (): LoadSurvey => {
  class LoadSurveysStub implements LoadSurvey {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysContoller(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    set(new Date())
  })

  afterAll(() => {
    reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
