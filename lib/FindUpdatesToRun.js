var Settings = require('../Settings.js')
var fs = require('fs')
var log = require('./log.js')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = function(callback) {
 
  var ev = new Backbone.Model()
  var history
  var updates

  // Get the history file
  ev.on('0', function() {
    fs.readFile(__dirname + '/../data/history.json','utf8', function(err, data) {
      if (err) {
        // no history yet, just create a blank history
        history = []
      }
      else {
        history = JSON.parse(data)
      }
      ev.trigger('1')
    })
  })

  // Get the updates file
  ev.on('1', function() {
    fs.readFile(__dirname + '/../data/updates.json','utf8', function(err, data) {
      if (err) throw err
      updates = JSON.parse(data)
      ev.trigger('2')
    })
  })

  // Compile a list of todo's
  ev.on('2', function() {
    return callback(null, _.difference(_.keys(updates), history))
  })

  ev.trigger('0')

}
