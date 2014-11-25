var Settings = require('./Settings.js'),
    fs = require('fs'),
    log = require('./lib/log.js'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    express = require('express'),
    cors = require('cors'),
    timeout = require('connect-timeout'),
    server = express(),
    checkForUpdates = require('./lib/CheckForUpdates.js'),
    runUpdates = require('./lib/RunUpdates.js');

// Check for updates
server.get('/check', function(req, res){
  checkForUpdates(function(message){
    res.write(message);
    res.end();
  });
});

// Run updates
server.get('/run', function(req, res){
  res.write('Updating...\n');

  runUpdates(function(error){
    res.write('Update done.');
    res.end();
  });
});

server.use(cors());
server.use(timeout('30m')); // 30 min timeout
server.listen(124);

console.log('Hive-Updater listening on port 124');
