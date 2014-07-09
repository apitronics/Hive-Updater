var exec = require('child_process').exec;
var cmd = '';
function puts(error, stdout, stderr) { sys.puts(stdout); }

module.exports = function(callback) {
  console.log("installing setuptools\n");
  cmd += 'wget https://bootstrap.pypa.io/ez_setup.py -O - | python';

  console.log("installing pytz\n");
  cmd += 'easy_install --upgrade pytz';

  console.log("updating hive\n");
  var hive_version = '1.1-beta1';
  cmd += 'cd /root/;';
  cmd += 'rm -rf GroundHive;';
  cmd += 'rm -rf Hive;';
  cmd += 'wget https://github.com/apitronics/Hive/archive/' + hive_version + '.tar.gz;';
  cmd += 'tar xf '+ hive_version + '.tar.gz;';
  cmd += 'mv Hive-' + hive_version + '/ Hive;';
  cmd += 'rm -f ' + hive_version + '.tar.gz;';
  cmd += 'cd Hive;';
  cmd += 'npm install;';
  cmd += 'cp util/Settings.default.js ./Settings.js;';
  cmd += './start.sh';

  console.log("updating cron jobs\n");
  cmd += 'systemctl stop cronie';
  cmd += 'rm /var/spool/cron/root';
  cmd += 'crontab /root/Hive/util/var/spool/cron/root';
  cmd += 'systemctl start cronie';

  exec(cmd, function() {
    callback();
  });
};
