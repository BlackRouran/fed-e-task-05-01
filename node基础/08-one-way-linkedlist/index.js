/**
 * 01 node + head =null
 * 02 head ---> null
 * 03 size
 *  
 * 04 next查找下一个节点 element存放数据 
 * 05 增 删 改 查 清空 
 */

class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor(head, size) {
    this.head = null
    this.size = 0
  }
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('越界了')
    }
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }
    return currentNode  
  }
  add(index, element) {
    if (arguments.length === 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('越界了')
    }
    if (index === 0) {
      // 往首部添加
      let head = this.head // 保存原有head的指向 
      this.head = new Node(element, head)
    } else {
      let prevNode = this._getNode(index - 1)
      // 上一节点的next 指向新节点， 新节点的next 为上一节点的next 
      // 0 1 2 a 3 比如在 2 3中间插了a,那么2的next 就是指向a, a的next应该为2 的next 
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++ 
  }
  remove(index) {
    let rmNode = null
    if (index === 0) {
      rmNode = this.head
      if (!rmNode) {
        return undefined
      }
      this.head = rmNode.next
    } else {
      let prevNode = this._getNode(index - 1)
      prevNode.next = prevNode.next.next
    }
    this.size--
    return rmNode
  }
  set(index, element) {
    let currentNode = this._getNode(index)
    currentNode.element = element
  }
  get(index) {
    return this._getNode(index)
  }
  clear() {
    this.head = null
  }  
}

class Queue {
  constructor () {
    this.linkedList = new LinkedList()
  }
  enQueue(data) {
    this.linkedList.add(data)
  }
  deQueue(){
    return this.linkedList.remove(0)
  }
}

let q = new Queue()
q.enQueue('q1')
q.enQueue('q2')
let a = q.deQueue()
a = q.deQueue()
console.log(a);
