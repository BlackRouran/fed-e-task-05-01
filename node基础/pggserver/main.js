const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const mime = require('mime')
const {createReadStream} = require('fs')
const ejs = require('ejs')
const {promisify} = require('util')

function mergeConfig (config) {
  return {
    port: 1234,
    directory: process.cwd(),
    ...config
  }
}

class Server {
  constructor (config) {
    this.config = mergeConfig(config)
    // console.log(this.config)
  }
  start () {
    let server = http.createServer(this.serverHandle.bind(this))
    server.listen(this.config.port, () => {
      console.log('服务端已经启动......')
    })
  }
  async serverHandle(req, res) {
    let {pathname} = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    let abspath = path.join(this.config.directory, pathname)
    try {
      let statObj = await fs.stat(abspath)
      if (statObj.isFile()) {
        this.fileHandle(req, res, abspath)
      } else {
        let dirs =  await fs.readdir(abspath)
        dirs = dirs.map((item => {
          return {
            path: path.join(pathname, item),
            dir: item
          }
        }))
        const renderFile = promisify(ejs.renderFile)
        let ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
          parent: pathname === '/' ? false : true,
          parentPath: path.dirname(pathname),
          basename: path.basename(abspath)
        })
        res.end(ret)
      } 
    } catch (err) {
      this.errorHandle(req, res, err)
    }
  }
  errorHandle(req, res, err) {
    console.log(err)
    res.statusCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }

  fileHandle(req, res, abspath) {
    res.statusCode = 200
    res.setHeader('Content-type', mime.getType(abspath) + ';charset=utf-8')
    createReadStream(abspath).pipe(res)
  }
}

module.exports = Server