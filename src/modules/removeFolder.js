const fs = require('fs');

const deleteFolderRecursive = function (path,done,callback) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath,done);
      } else { // delete file
        callbackOnFile(curPath);
      }
      
    });

    callbackOnFolder(null, curPath);
};

module.exports = deleteFolderRecursive;

//deleteFolderRecursive(somePath, callbackOnFolder, callbackOnFile );
//done();

const callbackOnFolder = (err,dir) => {
  if(err){
    throw new Error(err);
  }
  fs.rmdirSync(curPath); 
}

const callbackOnFile = (curPath) => {
  fs.unlinkSync(curPath);
}