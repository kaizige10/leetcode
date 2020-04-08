const Stack = require("../base/Stack.js");

/**
 * 用两个Stack模拟队列操作
 */
class StackQueue {
  constructor() {
    this.pushStack = new Stack();// 向push栈压入元素
    this.popStack = new Stack();// 从pop栈取元素
  }
  // 从队列首取一个元素
  poll() {
    this._pushToPop();
    return this.popStack.pop();
  }
  // 查看队首元素
  peek() {
    this._pushToPop();
    return this.popStack.peek();
  }
  // 取或者查看队首元素之前，要确保取的一定是队首元素
  _pushToPop() {
    if (this.popStack.isEmpty()) {
      while (!this.pushStack.isEmpty()) {
        this.popStack.push(this.pushStack.pop());
      }
    }
  }
  // 向队列尾部添加一个元素
  add(val) {
    this.pushStack.push(val);
  }
  toString() {
    return 'pushStack: ' + this.pushStack.toString() + "\npopStack: " + this.popStack.toString();
  }
}
module.exports = StackQueue;

const q = new StackQueue();
q.add(1);
q.add(2);
q.add(3);
console.log(q.peek() === 1);
console.log(q.poll() === 1);
q.add(4);
q.add(5);
console.log(q.poll() === 2);
console.log(q.poll() === 3);
console.log(q.poll() === 4);
console.log(q.poll() === 5);