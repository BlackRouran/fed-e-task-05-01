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

/**
 * 宏任务 
 * 微任务 p1 t1 p3 t2
 * timer  
 * poll
 * check 
 * 输出：start end p2 s1 s2 t1 t2 p1 p3
 */
