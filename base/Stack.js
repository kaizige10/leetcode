const LinkList = require('./LinkList.js');

class Stack {
  constructor(arr) {
    if (Array.isArray(arr)) {
      this.list = new LinkList(arr);
    } else {
      this.list = new LinkList();
    }
  }
  push(val) {
    this.list.push(val);
  }
  pop() {
    return this.list.pop();
  }
  size() {
    return this.list.length;
  }
  peek() {
    return this.list.get(this.list.length - 1)
  }
  isEmpty() {
    return this.list.length === 0
  }
  search(val) {
    return this.list.indexOf(val);
  }
  toString() {
    return this.list.toString();
  }
}
module.exports = Stack;

// //! 测试代码
// const stack1 = new Stack();
// stack1.push(3)
// stack1.push(7)
// stack1.push(5)
// console.log(stack1.peek() === 5)
// console.log(stack1.size() === 3)
// console.log(stack1.pop() === 5)
// console.log(stack1.pop() === 7)
// console.log(stack1.pop() === 3)
// console.log(stack1.pop() === undefined)

// const stack2 = new Stack([3,7,5]);
// console.log(stack2.search(7) === 1);

// console.log(stack2.peek() === 5)
// console.log(stack2.size() === 3)
// console.log(stack2.pop() === 5)
// console.log(stack2.pop() === 7)
// console.log(stack2.pop() === 3)
// console.log(stack2.pop() === undefined)
// console.log(stack2.isEmpty()===true);