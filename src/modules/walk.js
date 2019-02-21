const fs = require('fs');

const walk = function (dir, done, callback) {
  fs.readdir(dir, function (err, list) {
    if (err) return done(err,null);
    let i = 0;

    const next = function () {
      var filePath = list[i++];

      if (!filePath) return done(null,null);

      filePath = dir + '/' + filePath;

      fs.stat(filePath, function (_, stat) {
        if (stat && stat.isDirectory()) {
          walk(filePath, function (_) {
            next();
          }, callback);
        } else {
          callback(filePath, next);
        }
      });
    };

    next();
  });

  //fs.rmdirSync(path);
};

module.exports = walk;
