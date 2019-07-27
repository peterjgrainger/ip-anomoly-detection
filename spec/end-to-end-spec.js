const request = require('supertest');
const app = require('../src/app')

describe('/ip/check/:ipAddress', () => {
  it('returns failure (403) when the ip is in the list', done => {
    request(app)
      .get('/ip/check/1.1.1.1')
      .expect(403, done)
  })

  it('returns success (200) when the ip is not in the list ', done => {
    request(app)
      .get('/ip/check/1.1.1.8')
      .expect(204, done)
  })
})

