const fs = require('fs')
const path = require('path')

// readFile 读取文件中的内容

// fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
//   console.log(err)
//   console.log(data)
// })

// writeFile 往文件中写入内容
// 默认清空然后再写入
// 如果路径不存在会创建一个新文件
// fs.writeFile('data1.txt', 'hello node',{
//   mode: 438,
//   flag: 'w+',
//   encoding: 'utf-8'
// }, (err) => {
//   if (!err) {
//     fs.readFile('data.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })

// appendFile 往文件中追加内容
// fs.appendFile('data.txt', '哈哈哈哈哈' ,'utf-8', (err) => {
//   console.log('追加成功')
// })

// copyFile 复制文件内容
// fs.copyFile('data.txt', 'data2.txt', 'utf-8', (err) => {
//   console.log('复制成功')
// })

// watchFile 监听文件
// interval,监听时间， mtime 修改时间 curr当前文件对象 prev上一个文件对象
// fs.watchFile('data.txt', {
//   interval: 200
// }, (curr, prev) => {
//   if (curr.mtime !== prev.mtime) {
//     console.log('文件被修改了')
//     fs.unwatchFile('data.txt')
//   }
// })

// open 打开文件

// fs.open('data.txt', 'r', (err, fd) => {
//   console.log(fd)
//   fs.close(fd, (err) => {
//     console.log('关闭')
//   })
// })

//read 大文件读取
/**
  * rfd定位当前被打开的文件
  * buf 表示当前打开的缓冲区
  * offset 表示从buf 的哪个地方开始写
  * length 表示写入的长度
  * position 表示当前从文件哪个位置开始读取
  * 
*/
// let buf = Buffer.alloc(20)
// fs.open('data.txt', 'r', (err, rfd) => {
//   if(!err){
//     console.log(rfd)
//     fs.read(rfd, buf, 0, 4, 2, (err, readBytes, data) => {
//       if(!err){
//         console.log(readBytes)
//         console.log(data.toString()) //4567    
//       }
//     })
//   }
// })

//write 将缓冲区的内容写入磁盘

// let buf = Buffer.from('123456789')
/**
 * 2 表示从buffer的哪个位置写
 * 4表示写入的长度
 * 0 表示 从文件的哪个位置开始写，一般不动
*/ 

// fs.open('data3.txt', 'w', (err, wfd) => {
//   if (!err) {
//     fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
//       console.log(written, '----')
//     })
//   }
// })

// 查看文件权限
fs.access('b.txt', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('有操作权限')
  }
})

 //获取目录及文件信息
// fs.stat('data3.txt', (err, statObj) => {
//   if (!err) {
//     console.log(statObj)
//   }
// })

// 创建目录

/**
 * 如果不传参数，则创建的是最后一个目录，如果父目录不存在会报错
 * 如果传入 recursive: true，将递归创建目录
*/

// fs.mkdir('a/b/c',{recursive: true}, (err) => {
//   if (!err) {
//     console.log('创建成功')
//   } else {
//     console.log(err)
//   }
// })

//删除目录
// 如果传多级目录，默认将删除最后一层
// 如果传父目录，默认只能删除空目录， 传recursive 将递归删除父级目录下所有内容
// fs.rmdir('a', {recursive: true}, (err) =>{
//   if (!err) {
//     console.log('删除成功')
//   } else {
//     console.log(err)
//   }
// })

// readdir 读取目录信息read
// fs.readdir('a', (err, files) => {
//   if (!err) {
//     console.log(files);
//   } else {
//     console.log(err);
//   }
// })

//删除文件
// fs.unlink('a/a.txt', (err) => {
//   if (!err) {
//     console.log('删除成功');
//   }
// }) 




