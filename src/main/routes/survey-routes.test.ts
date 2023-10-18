import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
// import { sign } from 'jsonwebtoken'
// import env from '../config/env'
// import { ObjectId } from 'mongodb';

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Define Justice.',
          answers: [
            {
              answer: 'Justice',
              image: 'url'
            },
            {
              answer: 'Justice 2',
              image: 'url'
            }
          ]
        })
        .expect(403)
    })

    // test('Should return 204 add if valid token', async () => {
    //   const res = await accountCollection.insertOne({
    //     name: 'Eins',
    //     email: 'eins@gmail.com',
    //     password: '123',
    //     role: 'admin'
    //   })
    //   const id = res.insertedId.toHexString()
    //   const accessToken = sign({ id }, env.jwtSecret)

    //   await accountCollection.updateOne({
    //     _id: id
    //     },
    //     {
    //       $set: {
    //         accessToken
    //       },
    //     },
    //   )

    //   await request(app)
    //     .post('/api/surveys')
    //     .set('x-access-token', accessToken)
    //     .send({
    //       question: 'Define Justice.',
    //       answers: [
    //         {
    //           answer: 'Justice',
    //           image: 'url'
    //         },
    //         {
    //           answer: 'Justice 2',
    //           image: 'url'
    //         }
    //       ]
    //     })
    //     .expect(204)
    // })
  })
})
