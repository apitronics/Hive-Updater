var exec = require('child_process').exec,
    cmd = '';

function puts(error, stdout, stderr) { sys.puts(stdout); }

module.exports = function(callback) {
  console.log("updating to 1.0-beta10 \n");
  cmd += 'cd /root/;';
  cmd += 'rm -rf GroundHive;';
  cmd += 'rm -rf Hive;';
  cmd += 'wget https://github.com/apitronics/Hive/archive/1.0-beta10.tar.gz;';
  cmd += 'tar xf 1.0-beta10.tar.gz;';
  cmd += 'mv Hive-1.0-beta10/ Hive;';
  cmd += 'rm -f 1.0-beta10.tar.gz;';
  cmd += 'cd Hive;';
  cmd += 'npm install;';
  cmd += 'cp util/Settings.default.js ./Settings.js;';
  cmd += './start.sh';
  exec(cmd, function() {
    callback();
  });
};
