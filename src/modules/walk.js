const fs = require('fs');

const walkDir = function (path, callbackOnFolder, callbackOnFile) {

  let callbacknFolderFn = callbackOnFolder || function() {};

  fs.readdirSync(path).forEach(function (file) {

    var curPath = path + '/' + file;
    fs.lstatSync(curPath).isDirectory() ?
      walkDir(curPath, callbackOnFolder, callbackOnFile) 
      : 
      callbackOnFile(curPath);
    
  });

  callbacknFolderFn(path);

};

module.exports = walkDir;
