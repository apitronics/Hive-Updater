var Settings = require('./Settings.js')
var fs = require('fs')
var log = require('./lib/log.js')
var Backbone = require('backbone')
var _ = require('underscore')
var express = require('express')
var server = express()


server.get('/*', function(req, res){

  var ev = new Backbone.Model()
  var history
  var updates

  // Get the history file
  ev.on('0', function() {
    fs.readFile(Settings.path + '/data/history.json','utf8', function(err, data) {
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
    fs.readFile(Settings.path + '/data/updates.json','utf8', function(err, data) {
      if (err) throw err
      updates = JSON.parse(data)
      ev.trigger('2')
    })
  })

  // Compile a list of todo's, require them in, and run them sequentially
  ev.on('2', function() {
    var todo = _.difference(_.keys(updates), history)
    console.log(todo)
    if (todo.length < 1) {
      // nothing todo
      ev.trigger('3')
    }
    else {
      var i = 0
      // recursively run updates 
      function process(callback) {
        if(i == todo.length) {
          // we're all done
          ev.trigger('3')
        }
        else {
          var update = require(Settings.path + '/updates/' + updates[todo[i]].script)
          update(function() {
            i++
            process()
          })
        }
      }
      process()
    }           
  })
  
  // Write out what we've done into the history file
  ev.on('3', function() {
    fs.writeFile(Settings.path + "/data/history.json", JSON.stringify(_.keys(updates)), function(err) {
      console.log('done \n')       
      res.send('ok')
    })
  })

  ev.trigger('0')
})

server.listen(124);
console.log('Hive-Updater listening on port 124')


setTimeout(function() {
 
  var ev = new Backbone.Model()
  var history
  var updates

  // Get the history file
  ev.on('0', function() {
    fs.readFile(Settings.path + '/data/history.json','utf8', function(err, data) {
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
    fs.readFile(Settings.path + '/data/updates.json','utf8', function(err, data) {
      if (err) throw err
      updates = JSON.parse(data)
      ev.trigger('2')
    })
  })

  // Compile a list of todo's
  ev.on('2', function() {
    var todo = _.difference(_.keys(updates), history)
    console.log(JSON.stringify(todo))
  })

}, 30000)
