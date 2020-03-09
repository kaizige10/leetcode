/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 递归
var climbStairs1 = function(n) {
    if (n===1) return 1
    if (n===2) return 2
    return climbStairs(n-1) + climbStairs(n-2)
};
var climbStairs = function(n) {
    if (n===1) return 1
    if (n===2) return 2
    let steps = [1,2]
    for (let i = 2;i<n;i++) {
        steps[i] = steps[i-1] + steps[i-2]
    }
    return steps[n-1]
}
// @lc code=end

