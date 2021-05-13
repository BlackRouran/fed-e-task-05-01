#### 二、Buffer

###### 实例方法

1. buffer.fill()

   ```
   /*
    * 往buffer中填充数据
    * 有三个参数，第一个参数是填充内容，第二个参数是从哪个位置开始填充，第三个参数是填充的长度
    * 如果数据长度小于buffer长度，会自动重复填充
    * 如果大于则填满长度为止
    */
   let buf = Buffer.alloc(6)
   buf.fill('123') // <Buffer 31 32 33 31 32 33>
   console.log(buf) //123123
   
   buf.fill('123', 1, 3)
   console.log(buf) // <Buffer 00 31 32 00 00 00>
   console.log(buf.toString()) // 1231231231
   ```

2. buffer.write()

   往buffer中写入数据，有三个参数，第一个是写入的内容，第二个是从哪个位置开始写入，第三个是写入的长度。

   该方法不会自动填充满buffer

   ```
   let buf = Buffer.alloc(6)
   buf.write('1234') // 1234
   buf.write('123', 1, 3) //123
   
   ```

3. buffer.toString()

   将buffer转成我我们想要的类型，有三个参数，第一个是编码格式，第二个是开始时下标，第三个是结束的下标

   ```
   let buf = Buffer.from('我在学node')
   
   console.log(buf.toString()) // 我在学node
   console.log(buf.toString('utf-8', 3, 9)) // 在学
   console.log(buf.toString('utf-8', 1, 9)) // ��在学 乱码是因为 utf-8格式下，一个汉字占3个字节
   ```

   

4. buffer.slice()

   返回从目标buffer截取的数据，2个参数，第一个是截取的开始下标，第二个是结束下标

   ```
   let buf = Buffer.from('我在学node')
   
   let b1 = buf.slice().toString() // 我在学node
   let b2 = buf.slice(3).toString() // 在学node
   let b3 = buf.slice(3, 9).toString() // 在学
   ```

   

5. buffer.indexOf()

   查找目标buffer出现的下标，查不到返回-1

   ```
   
   let buf = Buffer.from('我在学node')
   
   console.log(buf.indexOf('在')) // 3
   console.log(buf.indexOf('在s')) // -1
   ```

   

6. buffer.copy()

   讲buffer拷贝到目标buffer，4个参数，第一个表示目标buffer,第二个参数是 从目标buffer的哪个位置开始写入，第三个参数表示 从源buffer的哪个位置开始，第四个参数表示源buffer的哪个位置结束

   ```
   let buf1 = Buffer.from('我在认真学node')
   let buf2 = Buffer.alloc(15)
   
   buf1.copy(buf2)
   console.log(buf2.toString()) // 我在认真学
   
   buf1.copy(buf2, 3)
   console.log(buf2.toString()) //   我在认真 前面有三个空格，表示从目标buffer的下标3开始
   
   buf1.copy(buf2, 3, 3)
   console.log(buf2.toString()) // 前面有3个空格 在认真学
   
   
   buf1.copy(buf2, 3, 3, 6)
   console.log(buf2.toString()) // 前面有3个空格 在
   ```

###### 静态方法

1. Buffer.concat()

   拼接两个buffer,两个参数，第一个是Buffer数组,第二个是合并后的buffer长度

   ```
   let b1 = Buffer.from('我在学习')
   let b2 = Buffer.from('node')
   
   console.log(Buffer.concat([b1,b2]).toString()) // 我在学习node
   console.log(Buffer.concat([b1,b2], 12).toString()) // 我在学习
   ```

   

2. Buffer.isBuffer()

   判断目标是不是buffer

   ```
   let b1 = Buffer.from('123')
   let b2 = '123'
   
   console.log(Buffer.isBuffer(b1)) // true
   console.log(Buffer.isBuffer(b2)) // false
   ```

   

#### 三、fs模块

1. fs.readFile()

   读取文件中的内容

   ```
   fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
     console.log(err)
     console.log(data)
   })
   ```

   

2. fs.writeFile()

   往文件中写数据，会先清空文件，然后写入

   ```
   fs.writeFile('data1.txt', 'hello node',{
     mode: 438,
     flag: 'w+',
     encoding: 'utf-8'
   }, (err) => {
     if (!err) {
       fs.readFile('data.txt', 'utf-8', (err, data) => {
         console.log(data)
       })
     }
   })
   ```

   

3. fs.appendFIle()

   appendFile 往文件中追加内容

   ```
   fs.appendFile('data.txt', '哈哈哈哈哈' ,'utf-8', (err) => {
     console.log('追加成功')
   })
   ```

   

4. fs.copyFile()

   copyFile 复制文件内容

   ```
   fs.copyFile('data.txt', 'data2.txt', 'utf-8', (err) => {
     console.log('复制成功')
   })
   ```

   

5. fs.WacthFile()

   监听文件内容

   ```
   //interval,监听时间， mtime 修改时间 curr当前文件对象 prev上一个文件对象
   fs.watchFile('data.txt', {
     interval: 200
   }, (curr, prev) => {
     if (curr.mtime !== prev.mtime) {
       console.log('文件被修改了')
       fs.unwatchFile('data.txt')
     }
   })
   ```

   

6. fs.openFile()

   打开文件，返回一个fd,fileID 供关闭使用

7. fs.closeFile()

   ```
   fs.open('data.txt', 'r', (err, fd) => {
     console.log(fd)
     fs.close(fd, (err) => {
       console.log('关闭')
     })
   })
   ```

   

8. readFile()

   ```
   /**
     * rfd定位当前被打开的文件
     * buf 表示当前打开的缓冲区
     * offset 表示从buf 的哪个地方开始写 0
     * length 表示写入的长度 4 
     * position 表示当前从文件哪个位置开始读取 2
     * 
   */
   let buf = Buffer.alloc(20)
   fs.open('data.txt', 'r', (err, rfd) => {
     if(!err){
       console.log(rfd)
       fs.read(rfd, buf, 0, 4, 2, (err, readBytes, data) => {
         if(!err){
           console.log(readBytes)
           console.log(data.toString()) //4567    
         }
       })
     }
   })
   ```

   

9. writeFile()

   ```
   let buf = Buffer.from('123456789')
   /**
    * 2 表示从buffer的哪个位置写
    * 4 表示写入的长度
    * 0 表示 从文件的哪个位置开始写，一般不动
   */ 
   
   fs.open('data3.txt', 'w', (err, wfd) => {
     if (!err) {
       fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
         console.log(written, '----')
       })
     }
   })
   ```

   

10. 自己实现 copyFile

    ```
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
    ```

    

11. fs.access()

    查看文件室友有操作权限，（windows下文件一般有可读可写不可执行）

    ```
    fs.access('data.txt', (err) => {
      if (err) {
        console.logs(err);
      } else {
        console.log('有操作权限')
      }
    })
    ```

    

12. fs.stat()

    获取目录以及文件信息

    ```
    fs.stat('data.txt', (err, statObj) => {
      if (!err) {
        console.log(statObj)
      }
    })
    ```

    

13. fs.mkdir()

    创建目录

    /**

     \* 如果不传参数，则创建的是最后一个目录，如果父目录不存在会报错

     \* 如果传入 recursive: true，将递归创建目录

    */

    ```
    fs.mkdir('a/b/c',{recursive: true}, (err) => {
      if (!err) {
        console.log('创建成功')
      } else {
        console.log(err)
      }
    })
    ```

    

14. fs.rmfile()

    删除目录

    // 如果传多级目录，默认将删除最后一层

    // 如果传父目录，默认只能删除空目录， 传recursive 将递归删除父级目录下所有内容

    ```
    fs.rmdir('a', {recursive: true}, (err) =>{
      if (!err) {
        console.log('删除成功')
      } else {
        console.log(err)
      }
    })
    ```

    

15. fs.readdir()

    读取目录信息

    ```
    fs.readdir('a', (err, files) => {
      if (!err) {
        console.log(files);
      } else {
        console.log(err);
      }
    })
    ```

    

16. fs.unlink()

    删除文件

    ```
    fs.unlink('a/a.txt', (err) => {
      if (!err) {
        console.log('删除成功');
      }
    }) 
    ```

    

#### 四、事件循环

* 浏览器中的事件循环

   * 依次执行同步代码，遇到宏任务放进宏任务队列，遇到微任务放微任务队列
   * 同步代码执行完成后，先检查微任务队列，依次执行，没有微任务就执行宏任务
   * 一个宏任务执行完成后，会立即检查微任务队列里时候是否有可执行的任务

  ```
  setTimeout(()=> {  
    console.log('s1')
    Promise.resolve().then(()=> {
      console.log('p1')
    })
  })
  console.log('start') 
  setTimeout(()=> { 
    console.log('s2')
    Promise.resolve().then(()=> {
      console.log('p2')
    })
  })
  
  Promise.resolve().then(()=> { 
    console.log('p3')
  })
  
  console.log('end') 
  
  // start end p3 s1 p1 s2 p2 
  ```

  

* NodeJs中的事件循环

   * NodeJS 事件循环机制中各个事件队列的优先级

     timers -> pending callbacks -> idel, prepare ->poll -> check -> close callbacks

   * NodeJs事件分类
     1. timers 指的是 setTimeout 和 setInteral 回调
     2. pending callbacks 指的是 操作系统的回调，例如 tcp和udp
     3. idel prepare 只发生再系统内部，一般不用考虑
     4. poll 执行I/O 操作的回调
     5. check 执行setImmediate中的回调
     6. close callbacks 执行closes事件的回调
   
   * NodeJs 完整事件环
   
     1. 执行同步代码，将不同的任务队列添加至相应的队列
   
     2. 所有同步代码执行完成后会执行满足条件的微任务
   
     3. 所有微任务执行完成后执行timer队列中满足的宏任务
   
     4. timer中的所有宏任务执行完成后会依次切换队列
   
     5. 注意：完成队列切换之前会优先清空微任务代码
   
        ```
        setTimeout(() => {
          //name s1
          console.log('s1')
        })
        
        Promise.resolve().then(() => {
          //name p1
          console.log('p1')
        })
        
        console.log('start')
        
        process.nextTick(() => {
          // name: t1
          console.log('tick')
        })
        
        setImmediate(() => {
          //name set
          console.log('setImmediate')
        })
        
        console.log('end')
        
        /**
         * 宏任务 
         * 微任务  p1 t1  (nextTIck优先级高于promise)
         * timer s1
         * poll
         * check set
         * 输出：start end tick p1 s1 setImmediate
         */
        
        ```
   
        ```
        setTimeout(() => {
          //name s1
          console.log('s1')
          Promise.resolve().then(() => {
            //name p1
            console.log('p1')
          })
          process.nextTick(() => {
            // name: t1
            console.log('t1')
          })
        })
        
        Promise.resolve().then(() => {
          //name p2
          console.log('p2')
        })
        
        console.log('start')
        
        setTimeout(()=> {
          console.log('s2');
          Promise.resolve().then(() => {
            //name p3
            console.log('p3')
          })
          process.nextTick(() => {
            // name: t2
            console.log('t2')
          })
        
        })
        
        
        console.log('end')
        
        // 所有宏任务执行完成后才会去执行微任务，这一点和浏览器不通
        /**
         * 宏任务 
         * 微任务 p1 t1 p3 t2
         * timer  
         * poll
         * check 
         * 输出：start end p2 s1 s2 t1 t2 p1 p3
         */
        
        ```
   
        

#### 五、stream

* NodeJs中流的分类
  1. Readable 可读流，能够实现流的读取
  2. Writeable 可写流，能够实现数据的写操作
  3. Duplex 双工流，既可读又可写
  4. Tranform 转换流 ，可读可写还可实现数据转换