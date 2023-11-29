const { program } = require('commander');

const {
    createFiels
} = require('./actions')

const options = program.opts()

const CreatInstructions = () => {
    // 创建项目指令
    program
        .command('add <fielname>')
        .description('add react component, 例如:crcs add Demo [-d src/pages]')
        .action((name) => {
            createFiels(name, options.directory || 'src/pages')
        })

    program
        .command('addP <fielname>')
        .description('addP react component, 例如:crcs addP Demo')
        .action((name) => {
            createFiels(name, 'src/pages')
        })
}

module.exports = {
    CreatInstructions
}