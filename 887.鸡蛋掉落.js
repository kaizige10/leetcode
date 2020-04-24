/*
 * @lc app=leetcode.cn id=887 lang=javascript
 *
 * [887] 鸡蛋掉落
 */

// @lc code=start
/**
 * 直接动态规划，超时，O(K * N * N)
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop1 = function (K, N) {
    /**
     * 
     * @param {*} K 
     * @param {*} N 
     * @param {Map} memo 
     */
    function dp(K, N, memo) {
        if (memo.has(K + ',' + N)) return memo.get(K + ',' + N);
        if (K === 1) return N;
        if (N === 0 || N === 1) return N;
        let res = N;
        for (let n = 1; n <= N; n++) {
            let breakNum = dp(K - 1, n - 1, memo)
            let notBreakNum = dp(K, N - n, memo)
            res = Math.min(res, Math.max(breakNum, notBreakNum) + 1)
        }
        memo.set(K + ',' + N, res);
        return res
    }
    let memo = new Map();
    let ans = dp(K, N, memo)
    return ans;
};
/**
 * 动态规划 + 二分查找，O(K * N * logN)
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N) {
    /**
     * 
     * @param {*} K 
     * @param {*} N 
     * @param {Map} memo 
     */
    function dp(K, N, memo) {
        if (memo.has(K + ',' + N)) return memo.get(K + ',' + N);
        if (K === 1) return N;
        if (N === 0 || N === 1) return N;
        let res = N;
        let l = 1, r = N;
        while(l <= r) {
            // 先找中间的楼层
            let mid = (l + r) >> 1;
            let breakNum = dp(K - 1, mid - 1, memo)// 鸡蛋碎了
            let notBreakNum = dp(K, N - mid, memo)// 鸡蛋没碎
            if (breakNum > notBreakNum) {
                // 碎了的值大于没碎的值，说明在2个单调函数的右边，因此接下来向左边找
                r = mid - 1
                res = Math.min(res, breakNum + 1)
            } else {// 向右边找
                l = mid + 1
                res = Math.min(res, notBreakNum + 1)
            }
        }
        memo.set(K + ',' + N, res);
        return res
    }
    let memo = new Map();
    let ans = dp(K, N, memo)
    return ans;
};
// @lc code=end

// console.log(superEggDrop(2, 6))
// console.log(superEggDrop(3, 14))
console.log(superEggDrop(4, 5000))