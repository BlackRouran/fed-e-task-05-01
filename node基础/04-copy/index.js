const path = require('path')
const fs = require('fs')

// 先打开a文件,然后读取a中的数据

let buf = Buffer.alloc(10)

let readOffset = 0

// 打开a
// fs.open('a.txt', 'r', (err, rfd) => {
//   // 打开b
//   fs.open('b.txt', 'w', (err, wfd) => {
//     // 读取a
//     fs.read(rfd, buf, 0, 10, 0, (err, readBytes, data) => {
//       if (!err) {
//         console.log(data.toString())
//         console.log('wfd', wfd)
//         // 写入b
//         fs.write(wfd, buf, 0, 10, 0, (err, writen) => {
//           console.log('写入成功')
//         })
//       }
//     })
//   })
// })

fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'w', (err, wfd) => {
    function next() {
      fs.read(rfd, buf, 0, 10, readOffset, (err, readBytes, data) => {
        if (!readBytes){
          fs.close(rfd, ()=> {})
          fs.close(wfd, ()=> {})
          console.log('copy end')
          return
        }
        readOffset += readBytes
        fs.write(wfd, buf, 0, readBytes,(err, writen) => {
          next()
        })
      })
    }
    next()
  })
})