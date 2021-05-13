const http = require('http')

let options = {
  host: 'localhost',
  port: 1234,
  path: '/?a=1',
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  }
}

let req = http.request(options, (res) => {
  let arr = []
  res.on('data', (data) => {
    arr.push(data)
  })
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})
req.end('{"name": "pgg"}')