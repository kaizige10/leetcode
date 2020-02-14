/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) return 1
    if (x === 1) return 1
    if (n < 0) {
        n = -1 * n
        x = 1 / x
    }
    let t = 1
    while(n) {
        if (n === 1) break
        if (n & 1) t *= x
        x = x * x
        //不能用n = n >> 1，这个2147483648数会变成负数
        n = Math.floor(n / 2)
    }
    return x * t
};
// @lc code=end

// let re = myPow(2, -2147483648)
// console.log(re)
// console.log(Math.pow(3, 10))
