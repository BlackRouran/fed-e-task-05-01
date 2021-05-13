const net = require('net')


const client = net.createConnection({
  port: 1234,
  host: 'localhost'
})

const msgList = ['拉钩教育2', '拉钩教育3', '拉钩教育4']

client.on('connect', () => {
  client.write('拉钩教育1')
  for(let i=0; i<msgList.length; i++) {
    (function(msg, delay){
      setTimeout(()=>{
        client.write(msg)
      }, delay)
    })(msgList[i], 1000 * i+1)
  }
})

client.on('data', (chunk)    => {
  console.log(chunk.toString())
})

client.on('error', (err) => {
  console.log(err)
})