const fs =require('fs').promises
const path = require('path')

function getSize(dirName){
  let size = 0
  async function computedSize (filename) {
    try {
      let statObj = await fs.stat(filename)
      if (statObj.isFile()) {
      let fileCon =  await fs.readFile(filename)
      size += fileCon.length
      let result = await fs.writeFile('size.txt',`size:${size}`)
      } else {
        let dirs = await fs.readdir(filename)
        for (let i=0; i< dirs.length; i++) {
          let curpath = path.join(filename, dirs[i])
          computedSize(curpath) 
        } 
      }
    } catch (err) {
      console.log(err)
    }
  }
  computedSize(dirName)
}
getSize('www')


