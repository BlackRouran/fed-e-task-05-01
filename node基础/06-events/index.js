
function MyEvents () {
  this._events = Object.create(null)
}

MyEvents.prototype.on = function (type, callback) {
  if (this._events[type]) {
    this._events[type].push(callback)
  } else {
    this._events[type] = [callback]
  }
}

MyEvents.prototype.emit = function (type, ...args) {
  if (this._events[type] && this._events[type].length) {
    this._events[type].forEach((callback)=>{
      callback.call(this, ...args)
    })
  }
}

MyEvents.prototype.off = function (type, callback) {
  if (this._events && this._events[type].length) {
    this._events[type] = this._events[type].filter(item => {
      return item !== callback && item.link !== callback
    })
  }
}

MyEvents.prototype.once = function (type, callback) {
  let foo = function (...args) {
    callback.call(this, ...args)
    this.off(type. foo)
  }
  foo.link = callback
  this.on(type, foo)
}

let ev = new MyEvents()

function fn (data) {
  console.log('事件执行了---', data)
}

ev.on('事件1',fn)

ev.emit('事件1',1)
// ev.off('事件1', fn)
ev.emit('事件1',2)