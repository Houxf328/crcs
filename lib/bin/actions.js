const path = require('path');
const fs = require('fs');

const { checkAndCreateFolder, questionEvent, compile, writeToFiel, rl } = require('../utils/utils');

const createFiels = async (name, fielPath) => {
    const dir = path.resolve(fielPath, name);

    let ejsTemplate, cssEjsTemplate, resultFielLessPath;

    const answer = await questionEvent('请选择创建模版的写法 class|hooks (y/n)');
    const cssAnswer = await questionEvent('请选择创建模版的写法 less|sass|No (l/s/n)');

    //class | hooks 写法选择
    if (answer.toLowerCase() === 'y') {
        ejsTemplate = 'react-component-class.ejs';
    } else {
        ejsTemplate = 'react-component-hooks.ejs';
    }

    //less | sass 写法选择
    switch (cssAnswer.toLowerCase()) {
        case 'l':
            cssEjsTemplate = 'less.ejs';
            resultFielLessPath = path.resolve(dir, `${name}.less`);
            break;
        case 's':
            cssEjsTemplate = 'sass.ejs';
            resultFielLessPath = path.resolve(dir, `${name}.sass`);
            break;
        case 'n':
            cssEjsTemplate = false;
            resultFielLessPath = false;
            break;
    }

    //编译ejs模版
    const ejsResult = ejsTemplate && await compile(ejsTemplate, { name, lowerName: name.toLowerCase(), iType: cssEjsTemplate === 'less.ejs' ? 'less' : 'sass' });
    const cssEjsResult = cssEjsTemplate && await compile(cssEjsTemplate, { name, lowerName: name.toLowerCase() });
    const resultFielPath = path.resolve(dir, `${name}.jsx`);
    if (fs.existsSync(dir)) {
        console.log('文件已存在');
    } else {
        if (!fs.existsSync(fielPath)) {
            const answerCreated = await questionEvent('没有父级文件夹，是否继续创建？(y/n)');
            if (answerCreated.toLowerCase() !== 'y') {
                console.log('已停止创建');
                return false;
            }
        }
        const result = checkAndCreateFolder(dir);
        if (result) {
            try {
                await writeToFiel(resultFielPath, ejsResult);
                cssEjsResult && await writeToFiel(resultFielLessPath, cssEjsResult);
                console.log('创建写入成功');
            } catch (error) {
                console.error('创建写入失败:', error);
            }
        }
    }
    rl.close();
}

module.exports = {
    createFiels
}