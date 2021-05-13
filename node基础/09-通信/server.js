const net = require('net')

// 创建服务实例
const server = net.createServer()

const PORT = 1234
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('llistening', () => {
  console.log(`serve is running ${HOST}: ${PORT}`)
})

// 接收消息
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)

    // 回数据
    socket.write(Buffer.from(`你好${msg}`))
  })
})

server.on('close', ()=> {
  console.log('服务端关闭')
})

server.on('error', (err) => {
  console.log(err)
})
