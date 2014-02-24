var exec = require('child_process').exec;
var cmd = ''
function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = function(callback) {
  console.log("running 4 \n")
  cmd += 'touch 4-was-here;'
  exec(cmd, function() {
    callback()
  })
}
