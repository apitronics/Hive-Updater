var exec = require('child_process').exec;
var cmd = '';
function puts(error, stdout, stderr) { sys.puts(stdout); }

module.exports = function(callback) {
  console.log("installing setuptools\n");
  cmd += 'wget https://bootstrap.pypa.io/ez_setup.py -O - | python';
  console.log("installing pytz\n");
  cmd += 'easy_install --upgrade pytz';
  exec(cmd, function() {
    callback();
  });
};
