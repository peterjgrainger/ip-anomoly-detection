const request = require('supertest');
const app = require('../src/app')
const redis = require('redis')

describe('/ip/check/:ipAddress', () => {

  let client;

  beforeAll(()=> {
    client = redis.createClient();

    client.on('connect', function() {
        console.log('connected');
    });

    client.set('1.1.1.1', 'some_data for 1.1.1.1', function(err, reply) {
      if(!err) console.log(reply)
    })


  })


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

