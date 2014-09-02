var exec = require('child_process').exec;
var cmd = '';
function puts(error, stdout, stderr) { sys.puts(stdout); }

module.exports = function(callback) {
  console.log("installing fixes\n");

  cmd += 'wget https://raw.githubusercontent.com/apitronics/Hive/master/XbeePython/Xbee.py -O /root/Hive/XbeePython/Xbee.py;';

  cmd += 'wget https://raw.githubusercontent.com/apitronics/Hive/master/CloudSync/sync.js -O /root/Hive/CloudSync/sync.js;';

  cmd += 'wget https://raw.githubusercontent.com/apitronics/Hive/master/util/SensorDefinitions.json -O /root/Hive/util/SensorDefinitions.json;';

  cmd += '/root/Hive/install.js;';

  exec(cmd, function() {
    callback();
  });
};
