var exec = require('child_process').exec;
var cmd = ''
function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = function(callback) {
  console.log("running 5 \n")
  cmd += 'cd ../GroundHive; git pull;'
  exec(cmd, function() {
    callback()
  })
}
