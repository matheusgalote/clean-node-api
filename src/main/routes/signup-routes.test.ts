import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
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
