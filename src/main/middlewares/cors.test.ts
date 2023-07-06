import request from 'supertest'
import app from '../config/app'

describe('CORS middleware', () => {
  test('Should enable cors', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('acess-control-allow-origin', '*')
      .expect('acess-control-allow-headers', '*')
      .expect('acess-control-allow-methods', '*')
  })
})
