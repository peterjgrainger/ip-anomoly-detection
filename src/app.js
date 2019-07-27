var express = require('express')
var redis = require('redis');

var options = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '6379',
  password: process.env.PASSWORD
}

var client = redis.createClient(options);

client.on('connect', function() {
    console.log('connected');
});

const app = express()
 
app.get('/ip/check/:ipAddress', function (req, res) {
  client.get(req.params.ipAddress, function(err, reply) {
    if(err) console.log(err)
    if (err || !reply) {
      res.status(204).send() 
    } else {
      res.status(403).send(reply)
    }
  });
  
})
module.exports = app
 


