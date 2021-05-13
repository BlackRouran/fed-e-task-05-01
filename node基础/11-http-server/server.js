const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')


const server = http.createServer((req, res) => {
  // console.log('请求进入');
  let {pathname, query} = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  let absPath = path.join(__dirname, pathname)
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end(`${req.method}/Not Found`)
      return
    }

    if (statObj.isFile()) {
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.end(data)
      })
    } else {
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.end(data)
      })
    }
  })
})

server.listen(1234, () => {
  console.log('server is statrt.....');
})