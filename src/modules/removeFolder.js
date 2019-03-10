const fs = require('fs');
const copyFile = require('./copyFile');

const walkDir = function (path,callbackOnFolder = () => {},callbackOnFile = () => {}) {

    fs.readdirSync(path).forEach(function (file, index) {

      var curPath = path + '/' + file;
      fs.lstatSync(curPath).isDirectory() ? walkDir(curPath,callbackOnFolder,callbackOnFile) 
      : 
      callbackOnFile(curPath);
      
    });

    callbackOnFolder(null, curPath);

};

const callbackOnFolder = (err,dir) => {
  if(err){
    throw new Error(err);
  }
  fs.rmdirSync(curPath); 
}

const callbackOnFile = (curPath,isShouldDelete) => {
  copyFile(curPath, sourcePath, () =>{
    isShouldDelete && fs.unlinkSync(curPath);
  })
  
}

isShouldDelete = true


walkDir(somePath,isShouldDelete ? callbackOnFolder : null,callbackOnFile)