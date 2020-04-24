//! 10万个数据数组的插入
let a = Array(100000).fill(1)
let b = Array(100000).fill(1)

console.time('push 100000')
for (let i = 0; i < 100000; i++) {
    a.push(0)
}
console.timeEnd('push 100000')


console.time('unshift 100000')
for (let i = 0; i < 100000; i++) {
    b.unshift(0)
}
console.timeEnd('unshift 100000')

//! 0个数据数组的插入
let c = []
let d = []

console.time('push 0')
for (let i = 0; i < 100000; i++) {
    c.push(0)
}
console.timeEnd('push 0')


console.time('unshift 0')
for (let i = 0; i < 100000; i++) {
    d.unshift(0)
}
console.timeEnd('unshift 0')