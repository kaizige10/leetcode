// 第一题，求斐波那契数的第N项
let cache = {1:1, 2:1}
function fib(N) {
    if (cache[N]) return cache[N]
    let ans = fib(N-2) + fib(N-1)
    cache[N] = ans
    return ans
}
//test
console.log('第一题：求斐波那契数的第N项');

console.log(fib(1) === 1)
console.log(fib(5) === 5)
console.log(fib(8) === 21)

// 第二题：台阶的走法
// 假设有N个台阶，每次可以走1或者2个台阶，请问有多少种台阶的走法？
let stepCache = {1:1, 2:2}
function step(N) {
    if (stepCache[N]) return stepCache[N]
    let ans = step(N-2) + step(N-1)
    stepCache[N] = ans
    return ans
}
// test
console.log('第二题：台阶的走法');
console.log(step(3) === 3)
console.log(step(4) === 5)

// 第三题：N年后牛的数量
// 题目：假设一头成熟的母牛每年生一头小母牛，小母牛3年后成熟，又可以生牛。第一年有一头成熟的母牛，它从第二年开始生小牛，求N年农场牛的数量。
// 我的思路：A是年龄为1岁的小牛数量，B是年龄为2岁的小牛数量，C是成熟牛的数量
// 下一年A等于C， B等于A， C等于C + B
function cows(N) {
    let A = 0, B = 0, C = 1
    for (let i = 2;i<=N; i++) {
        [A, B, C] = [C, A, C + B]
    }
    return A + B + C
}
// 实际上牛的数量的递推式是：C(N) = C(N-1) + C(N-3)
// C(N-1)即去年的牛的数量，C(N-3)即今年生下的小牛的数量，
// 为什么是C(N-3)呢，因为生小牛需要成熟牛，而今年的成熟牛一定是三年前出生的
function cows2(N) {
    if (N===1 || N===2||N===3) return N
    return cows2(N-1) + cows2(N-3)
}
// test
console.log('第三题：牛的数量');
console.log(cows(1) === 1)
console.log(cows(2) === 2)
console.log(cows(3) === 3)
console.log(cows(4) === 4)
console.log(cows(5) === 6)
console.log(cows(6) === 9)