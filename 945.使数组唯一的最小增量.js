/*
 * @lc app=leetcode.cn id=945 lang=javascript
 *
 * [945] 使数组唯一的最小增量
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function(A) {
    let len = A.length
    if (len <= 1) return 0

    A.sort((a, b) => a - b)

    let count = 0
    for (let i = 1; i < len; i++) {
        if (A[i] <= A[i-1]) {
            count += A[i-1] - A[i] + 1
            A[i] = A[i-1] + 1
        }
    }
    return count
};
// @lc code=end

console.log(minIncrementForUnique([3,2,1,2,1,7]))
console.log(minIncrementForUnique([1,2,2]))