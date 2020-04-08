const Stack = require("../base/Stack.js");

/**
 * 
 * @param {Stack} stack 
 */
function sortStack(stack) {
  const helpStack = new Stack()
  while(!stack.isEmpty()) {
    let cur = stack.pop()
    // cur若更大，则把help中的元素pop；cur小，则push到help，保证每次把最大的元素放到help的底部
    while (!helpStack.isEmpty() && cur > helpStack.peek()) {
      stack.push(helpStack.pop())
    }
    helpStack.push(cur)
  }
  while(!helpStack.isEmpty()) {
    stack.push(helpStack.pop())
  }
}

let stack = new Stack([5,1,7,3,8,2,9,4])
console.log(stack.toString())
sortStack(stack)
console.log(stack.toString())