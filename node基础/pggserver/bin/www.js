#! /usr/bin/env node

const {program} = require('commander') 

// console.log('执行了')
// -p 命令简写 --port 全称 set server port 描述
// program.option('-p --port', 'set server port')

let options = {
  '-p --port <dir>' : {
    'description': 'init server port',
    'forexample': 'pggserver -p 3306'
  },
  '-d --directory <dir>' : {
    'description': 'init server directory',
    'forexample': 'pggserver -d d:'
  }
}

function formatConfig (configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})


program.on('--help', () => {
  console.log('Examples:')
  formatConfig(options, (cmd, val) => {
    console.log(val.forexample)
  })
})

program.name('pggserver')
let version = require('../package.json').version
program.version(version)

program.parse(process.argv)
const cmdConfig = program.opts()

const Server = require('../main.js')

new Server(cmdConfig).start()