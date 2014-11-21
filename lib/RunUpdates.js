var _s = require('underscore.string');

module.exports = function(callback) {
  var exec = require('child_process').exec,
      child,
      message = '',
      cmd = '';

  cmd += 'cd /root/Hive;';
  cmd += 'git stash;';
  cmd += 'git checkout master;';

  cmd += 'git pull;';
  cmd += 'npm install;';
  cmd += 'git stash apply;';

  child = exec(cmd,
    function (error, stdout, stderr) {
      callback();
    }
  );
};
