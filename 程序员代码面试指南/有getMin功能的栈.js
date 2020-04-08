const Stack = require('../base/Stack.js');

class MinStack {
  constructor() {
    this.minStack = new Stack();// 保存当前最小值的栈
    this.dataStack = new Stack();// 保存数据的栈
  }
  push(val) {
    if (this.minStack.isEmpty() || this.minStack.peek() >= val) {
      this.minStack.push(val)
    }
    this.dataStack.push(val)
  }
  pop() {
    if (this.minStack.peek() == this.dataStack.peek()) {
      this.minStack.pop()
    }
    return this.dataStack.pop()
  }
  peek() {
    return this.dataStack.peek()
  }
  getMin() {
    return this.minStack.peek()
  }
  toString() {
    return this.dataStack.toString() + '\n' + this.minStack.toString();
  }
}
module.exports = MinStack;

//! 测试代码
const st = new MinStack();
st.push(5)
st.push(4)
st.push(6)
st.push(2)
st.push(2)
console.log(st.toString());

console.log(st.peek()===2)
console.log(st.getMin()===2)
console.log(st.pop()===2)
console.log(st.getMin()===2)
console.log(st.pop()===2)
console.log(st.getMin()===4)
console.log(st.pop()===6)
console.log(st.getMin()===4)
console.log(st.pop()===4)
console.log(st.getMin()===5)
console.log(st.pop()===5)
console.log(st.getMin()===undefined)
