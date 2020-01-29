/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
// 递归
var fib1 = function (N) {
    if (N === 0) return 0
    if (N === 1) return 1
    return fib(N - 2) + fib(N - 1)
};

// 缓存
const cache = new Map()
var fib2 = function (N) {
    if (N === 0) return 0
    if (N === 1) return 1
    if (cache.has(N)) return cache.get(N)
    const result = fib(N - 2) + fib(N - 1)
    cache.set(N, result)
    return result
};

// 递推
var fib = function (N) {
    const cache = []
    for (let i = 0; i <= N; i++) {
        if (i == 0 || i == 1) {
            cache[i] = i
        } else {
            cache[i] = cache[i - 1] + cache[i - 2]
        }
    }
    return cache[N]
};
// @lc code=end

