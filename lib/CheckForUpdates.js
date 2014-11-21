var _s = require('underscore.string');

module.exports = function(callback) {
  var exec = require('child_process').exec,
      cmdNumChanges = '',
      cmdTextChanges,
      cmdStashApply;

  cmdNumChanges += 'cd /root/Hive;';
  cmdNumChanges += 'git stash;';
  cmdNumChanges += 'git checkout master;';
  cmdNumChanges += 'git fetch && git log --pretty=oneline ..@{u} | wc -l;';

  cmdTextChanges = 'cd /root/Hive && git fetch && git log --pretty=format:"%cd %s" --date=short ..@{u};';

  cmdStashApply = 'cd /root/Hive; git stash apply;';

  exec(cmdNumChanges, function (error, stdout, stderr) {
    var output = _s.trim(stdout).split("\n"),
        numChanges = parseInt(_s.trim(output[output.length - 1]), 10);

    if(numChanges > 0) {
      exec(cmdTextChanges, function (error, stdout, stderr) {
        callback(stdout);
      });
    } else {
      callback('');
    }

    exec(cmdStashApply);
  });
};
