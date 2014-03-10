var exec = require('child_process').exec;
var cmd = ''
function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = function(callback) {
  console.log("running 7 \n")
  cmd += 'cd /root/;'
  cmd += 'rm -r GroundHive;'
  cmd += 'wget https://github.com/apitronics/Hive/archive/1.0-beta4.tar.gz;'
  cmd += 'tar xf 1.0-beta4.tar.gz;'
  cmd += 'mv Hive-1.0-beta4/ Hive;'
  cmd += 'rm 1.0-beta4.tar.gz;'
  cmd += 'cd Hive;'
  cmd += 'npm install;'
  cmd += 'cp util/Settings.default.js ./Settings.js;'
  exec(cmd, function() {
    callback()
  })
}
