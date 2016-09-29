var fs = require('fs')
var path = require('path')
var should = require('should')
var request = require('supertest')
var _ = require('underscore')

var config = require('@dadi/web').Config
var app = require('@dadi/web')

var connectionString = 'http://' + config.get('server.host') + ':' + config.get('server.port')

describe('Routing', function (done) {
  describe('Redirects', function (done) {
    it('should redirect to trailing slash version of Shop URL', function (done) {
      var client = request(connectionString)
      client
      .get('/shop')
      .expect(301)
      .end((err, res) => {
        res.headers['location'].should.containEql('/shop/')
        done()
      })
    })

    it('should redirect to trailing slash version of Look URL', function (done) {
      var client = request(connectionString)
      client
      .get('/look')
      .expect(301)
      .end((err, res) => {
        res.headers['location'].should.containEql('/look/')
        done()
      })
    })
  })

  describe('Shop', function (done) {
    it('should stuff', function (done) {
      var client = request(connectionString)
      client
      .get('/shop')
      .expect(301)
      .end((err, res) => {
        res.headers['location'].should.containEql('/shop/')
        done()
      })
    })
  })
})
