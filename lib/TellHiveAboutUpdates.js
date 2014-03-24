var Settings = require('../Settings')
var nano = require('nano')(Settings.CouchDB.URL)
var configDb = nano.use('config')

module.exports = function(updates, callback) {
  configDb.get('HiveUpdates', function(err, doc) {
    if (!doc) doc = {}
    doc.updates = updates
    configDb.insert(doc, 'HiveUpdates', function(err, res) {
      callback(err, res)
    })
  })
}
