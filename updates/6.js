var exec = require('child_process').exec;
var cmd = ''
function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = function(callback) {
  console.log("running 5 \n")
  cmd += 'cd /root/;'
  cmd += 'rm -r GroundHive;'
  cmd += 'wget https://github.com/apitronics/GroundHive/archive/1.0-beta3.tar.gz;"
  cmd += 'tar xf 1.0-beta3.tar.gz;'
  cmd += 'mv GroundHive-1.0-beta3/ GroundHive;'
  cmd += 'rm 1.0-beta3.tar.gz'
  exec(cmd, function() {
    callback()
  })
}
