const fs = require('fs');
const path = require('path');
const walkDir = require('./modules/walk');
const copyFile = require('./modules/copyFile');

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
const isShouldRemoveInputFolder = process.argv[4];

// Проверяет существует ли папка, если нет - создает ее
const checkOrCreateFolder = function (dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

/*
// Вызывается после копирования всех файлов
const done = function (err) {
  if (err) throw err;
  console.log('Все файлы скопированы!');

  if (isShouldRemoveInputFolder) {
    removeFolder(inputFolder);
    console.log('Исходная папка удалена!');
  }
};\
*/



// Проверяем передачу параметров
if (!inputFolder || !outputFolder) {
  throw new Error('Не указаны пути к выходной или выходной папке!');
} else {
  // Если пути переданы - чекаем есть ли выходной каталог, иначе создаем его
  checkOrCreateFolder(outputFolder);
}

const callbackOnFolder = (curPath) => {
  fs.rmdirSync(curPath); 
}

const callbackOnFile = (curPath) => {
  const fileName = path.basename(curPath);
  const folderName = fileName[0].toUpperCase();
  const newFilePath = path.resolve(outputFolder, `./${folderName}/${fileName}`);
  checkOrCreateFolder(path.resolve(outputFolder, `./${folderName}`));
  copyFile(curPath, path.resolve(outputFolder, newFilePath), () => {
    isShouldRemoveInputFolder && fs.unlinkSync(curPath);
  })
}

walkDir(inputFolder, isShouldRemoveInputFolder ? callbackOnFolder : null, callbackOnFile)