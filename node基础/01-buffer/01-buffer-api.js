/*
 * 往buffer中田中数据
 * 有三个参数，第一个参数是填充内容，第二个参数是从哪个位置开始填充，第三个参数是填充的长度
 * 如果数据长度小于buffer长度，会自动重复填充
 * 如果大于则填满长度为止
 */
// let buf = Buffer.alloc(6)
// buf.fill('123') // <Buffer 31 32 33 31 32 33>
// console.log(buf) //123123

// buf.fill('123', 1, 3)
// console.log(buf) // <Buffer 00 31 32 00 00 00>
// console.log(buf.toString()) // 1231231231

// let buf = Buffer.alloc(6)
// buf.write('1234') // 1234
// buf.write('123', 1, 3) //123

// let buf = Buffer.from('我在学node')

// console.log(buf.toString()) // 我在学node
// console.log(buf.toString('utf-8', 3, 9)) // 在学
// console.log(buf.toString('utf-8', 1, 9)) // ��在学 乱码是因为 utf-8格式下，一个汉字占3个字节

// let buf = Buffer.from('我在学node')

// let b1 = buf.slice().toString() // 我在学node
// let b2 = buf.slice(3).toString() // 在学node
// let b3 = buf.slice(3, 9).toString() // 在学
// console.log(b1,b2,b3)

// let buf = Buffer.from('我在学node')

// console.log(buf.indexOf('在')) // 3
// console.log(buf.indexOf('在s')) // -1

// let buf1 = Buffer.from('我在认真学node')
// let buf2 = Buffer.alloc(15)

// buf1.copy(buf2, 3, 3, 6)
// console.log(buf2.toString()) // 前面有3个空格 在

// let b1 = Buffer.from('我在学习')
// let b2 = Buffer.from('node')

// console.log(Buffer.concat([b1,b2]).toString()) // 我在学习node
// console.log(Buffer.concat([b1,b2], 12).toString()) // 我在学习
let b1 = Buffer.from('123')
let b2 = '123'

console.log(Buffer.isBuffer(b1))
console.log(Buffer.isBuffer(b2))