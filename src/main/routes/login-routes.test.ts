import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Eins',
          email: 'eins@gmail.com',
          password: 'eins123',
          passwordConfirmation: 'eins123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Eins',
        email: 'eins@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'eins@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 if user does not exists', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'eins@gmail.com',
          password: '1234'
        })
        .expect(401)
    })

    test('Should return 401 if password is wrong', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Eins',
        email: 'eins@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'eins@gmail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
