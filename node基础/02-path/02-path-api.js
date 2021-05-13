
const path = require('path')

// console.log(__filename) //E:\pathtest\01.js

// console.log(path.basename(__filename)) //01.js

// console.log(path.basename(__filename, '.js')) //01

// console.log(path.basename('/a/c/b')) // b

// console.log(path.dirname(__filename)) // E:\pathtest
// console.log(path.dirname('a/b/c')) // a/b
// console.log(path.dirname('a/b/c/')) // a/b

// console.log(path.extname(__filename)) // .js
// console.log(path.extname('a/b/c')) // 空
// console.log(path.extname('a/b/c/index.html.js.css')) // .css


// 接收一个路径，返回一个对象 
//root dir ext name base
// console.log(path.parse(__filename));

// console.log(path.parse('/a/b/c'))

// console.log(path.parse('./a/b/c'))

// 判断是否绝对路径
// console.log(path.isAbsolute('./c'))
// console.log(path.isAbsolute('/c'))

// 拼接路径
// console.log(path.join('a/b', 'c', 'index.html'))  // a\b\c\index.html
// console.log(path.join('/a/b', 'c', 'index.html')) // \a\b\c\index.html
// console.log(path.join('/a/b', 'c', '../','index.html')) // a\b\index.html
// console.log(path.join('/a/b', 'c','./', 'index.html')) // a\b\c\index.html

// 规范化路径

console.log(path.normalize('/a/////b///c/d')) // \a\b\c\d

// 返回绝对路径

console.log(path.resolve('index.html')) //E:\pathtest\index.html