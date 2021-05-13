const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // 请求方法
  // console.log(req.method)

  // http版本
  // console.log(req.httpVersion)

  // 请求头
  // console.log(req.headers)

  // GET请求
  // const { pathname, query } = url.parse(req.url, true)
  // console.log(pathname, '------', query)
  
  // 获取请求体数据
  let arr = []
  req.on('data', (data) => {
    arr.push(data)
  })

  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })

  res.end('请求成功')
})

server.listen(1234, () => {
  console.log('server is running')
})