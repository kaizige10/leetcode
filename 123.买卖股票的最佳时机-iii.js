/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * 使用状态机框架来做
 *   不持有
 *     dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] + prices[n]);
 *   持有
 *     dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] - prices[n]);
 * 对于k=2的场景，只能用三维数组
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length < 2) return 0;
    const dp = Array.from({ length: prices.length }, () => {
        return Array.from({ length: 3 }, (a, k) => {
            return Array.from({ length: 2 }, (b, rest) => {
                // 对于k=0，还持有的状态是不存在的，初始化为无穷小的负数
                if (k === 0 && rest === 1) {
                    return -Number.MAX_VALUE;
                }
                return 0;
            });;
        });
    });
    // 初始化第一天直接买入的情况
    dp[0][1][1] = -prices[0];
    dp[0][2][1] = -prices[0];
    // console.log(dp);

    for (let n = 1; n < prices.length; n++) {
        for (let k = 1; k < 3; k++) {
            // 不持有： 昨天不持有，今天不变 或者 昨天持有，今天卖出获利
            dp[n][k][0] = Math.max(dp[n - 1][k][0], dp[n - 1][k][1] + prices[n]);
            // 持有： 昨天持有，今天不变 或者 昨天不持有，今天买入
            dp[n][k][1] = Math.max(dp[n - 1][k][1], dp[n - 1][k - 1][0] - prices[n]);
        }
    }
    // console.log(dp);
    return Math.max(
        dp[prices.length - 1][0][0],
        dp[prices.length - 1][1][0],
        dp[prices.length - 1][2][0]
    );
}
// @lc code=end
// console.log(maxProfit([3,3,5,0,0,3,1,4]));
