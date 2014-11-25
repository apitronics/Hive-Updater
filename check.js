var Settings = require('./Settings'),
    nano = require('nano')(Settings.CouchDB.URL),
    request = require('request-json'),
    configDb = nano.use('config'),
    client = request.newClient(Settings.UpdateURL, {jar: true});

configDb.get('Settings', function(err, settings) {
  if (err) {
    console.error(settings);
  }
  else {
    if(!settings.autoUpdateHive){
      log('Turned off');
    } else {
      log('****** Updating ******');
      client.get('/update/run', function(){
        log('Done');
      });
    }
  }
});

function log(){
  var args = Array.prototype.slice.call(arguments);
  console.log('Auto Update Hive -', args.join(' '));
}
