var exec = require('child_process').exec;
var cmd = '';
function puts(error, stdout, stderr) { sys.puts(stdout); }

module.exports = function(callback) {
  console.log("installing setuptools\n");
  cmd += 'wget https://bootstrap.pypa.io/ez_setup.py -O - | python && ';
  cmd += 'rm -f setuptools-5.7.zip && ';

  console.log("installing pytz\n");
  cmd += 'easy_install --upgrade pytz; ';

  console.log("installing six\n");
  cmd += 'easy_install --upgrade six; ';

  console.log("updating sensor defs\n");
  cmd += 'curl -H "Content-Type: application/json" -X POST http://localhost:5984/_replicate -d \'{"source": "http://db.apitronics.com:5984/config", "target": "config"}\'; ';

  console.log("updating hive\n");
  var hive_version = '1.1-beta1';
  cmd += '/root/GroundHive/stop.sh; ';
  cmd += '/root/Hive/stop.sh; ';
  cmd += 'cd /root && ';
  cmd += 'rm -rf GroundHive && ';
  cmd += 'rm -rf Hive && ';
  cmd += 'wget https://github.com/apitronics/Hive/archive/' + hive_version + '.tar.gz -O /root/Hive.tar.gz && ';
  cmd += 'tar xf Hive.tar.gz && ';
  cmd += 'mv Hive-' + hive_version + ' Hive && ';
  cmd += 'rm -f /root/Hive.tar.gz && ';
  cmd += 'cd /root/Hive && ';
  cmd += 'npm install && ';
  cmd += 'cp util/Settings.default.js ./Settings.js && ';
  cmd += './start.sh && ';

  console.log("updating cron jobs\n");
  cmd += 'rm -f /var/spool/cron/root && ';
  cmd += 'crontab /root/Hive/util/var/spool/cron/root';

  exec(cmd, function() {
    callback();
  });
};
