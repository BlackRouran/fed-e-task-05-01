const http = require('http')
const url = require('url')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
  //GET
  let {pathname, query} = url.parse(req.url)
  console.log(pathname, '----', query)
  // POST
  let arr = []
  req.on('data', (data) => {
    arr.push(data)
  })

  req.on('end', () => {
    let obj = Buffer.concat(arr).toString()
    const contentType = req.headers['content-type']
    console.log(contentType)
    if (contentType === 'application/x-www-form-urlencoded') {
      const transVal = queryString.parse(obj)
      transVal.add = 'add value'
      res.end(JSON.stringify(transVal))
    } else if (contentType === 'application/json') {
      let obt = JSON.parse(obj)
      obt.add = 'add value'
      res.end(JSON.stringify(obt))
    }
  })
})

server.listen(1234, () => {
  console.log('server is running')
})