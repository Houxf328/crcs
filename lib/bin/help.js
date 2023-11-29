const { program } = require('commander');

const helpContents = () => {
    program
        .option('-d, --directory <directory>', 'a destination folder, 例如: -d src/pages, 错误/src/pages')
    //添加自定义 -h,-help 内容
    // .addHelpText('after', '  -f   display help for command')
}

module.exports = {
    helpContents
};