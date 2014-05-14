var exec = require('child_process').exec;
var cmd = ''
function puts(error, stdout, stderr) { sys.puts(stdout) }

module.exports = function(callback) {
  cmd='touch /root/test.txt'
  exec(cmd, function() {
    callback()
  })
}
