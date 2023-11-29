const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ejs = require('ejs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//反馈提示
const questionEvent = (info, fielPath, resultPath, ejsContent) => {
  return new Promise((resolve) => {
    rl.question(info, (answer) => {
      resolve(answer);
    });
  });
}

//创建文件夹
const checkAndCreateFolder = (fielPath) => {
  // 检查文件路径是否存在
  if (fs.existsSync(fielPath)) {
    //检查该文件路径是否为一个文件夹
    if (!fs.statSync(fielPath).isDirectory()) {
      console.log(`${fielPath}不是一个文件夹`);
      return false;
    }
    return true;
  } else {
    if (checkAndCreateFolder(path.dirname(fielPath))) {
      // 存在父亲文件，就直接新建该文件
      try {
        fs.mkdirSync(fielPath);
      } catch (error) {
        console.error('创建目录时出错:', error);
        return false;
      }
      return true;
    }
  }
}

//编译ejs模版，输出内容
const compile = (ejsName, data) => {
  const templatePosition = `../templates/${ejsName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, resault) => {
      if (err) {
        console.log(err);
        reject(err)
        return;
      }
      resolve(resault)
    })
  })
}

//写入ejs模版内容
const writeToFiel = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  checkAndCreateFolder,
  questionEvent,
  compile,
  writeToFiel,
  rl
}