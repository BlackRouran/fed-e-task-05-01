const http = require('http')
const path = require('path')
const url = require('url')
const mime = require('mime')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let {pathname} = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  let absPath = path.join(__dirname, pathname)
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end(`${req.method}: ${pathname}  ---Not Found`)
      return
    }
    fs.readFile(absPath, (err, data) => {
      res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
      res.end(data)
    })
  })
})
  
server.listen(1234, () => {
  console.log('server is running')
})