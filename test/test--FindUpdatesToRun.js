var expect = require('chai').expect
var fs = require('fs-extra')
var findUpdatesToRun = require('../lib/FindUpdatesToRun.js')

var prepare = function(callback) {
  fs.copy(__dirname + '/../data/updates.json', __dirname + '/../data/updates.orig.json', function(err) {
    fs.copy(__dirname + '/../data/history.json', __dirname + '/../data/history.orig.json', function(err) {
      fs.copy(__dirname + '/updates.test.json', __dirname + '/../data/updates.json', function(err) {
        fs.copy(__dirname + '/history.test.json', __dirname + '/../data/history.json', function(err) {
          callback()
        })
      })
    })
  })
}

var cleanup = function(callback) {
  fs.copy(__dirname + '/../data/updates.orig.json', __dirname + '/../data/updates.json', function(err) {
    fs.copy(__dirname + '/../data/history.orig.json', __dirname + '/../data/history.json', function(err) {
      fs.remove(__dirname + '/../data/updates.orig.json', function(err) {
        fs.remove(__dirname + '/../data/history.orig.json', function(err) {
          callback()
        })
      })
    })
  })
}

describe('FindUpdatesToRun', function() {
  it('should give us 3 updates to run', function(done) {
    prepare(function() {
      console.log('done with prepare')
      findUpdatesToRun(function(err, updates) {
        console.log('done with findUpdatesToRun')
        expect(updates.length).to.equal(2)
        cleanup(function() {
          console.log('done with cleanup')
          done()
        })
      })
    })
  })
})

