#!/usr/bin/env node
const program = require('commander');

const { version } = require('./package.json')
const { helpContents } = require('./lib/bin/help')
const { CreatInstructions } = require('./lib/bin/creat')

// 定义显示模块的版本号
program.version(version)

//自定义help内容
helpContents()

//创建自定义指令
CreatInstructions()

//解析终端指令
program.parse(process.argv)

