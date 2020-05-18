/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start

/**
 * 使用状态机框架来做
 *   不持有
 *     dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] + prices[n]);
 *   持有
 *     dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] - prices[n]);
 * 对于k=+Inf的场景，k和k-1可以认为是相同，因此可以省去第二个维度k，使用二维数组来做
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    if (prices.length < 2) return 0;
    const dp = Array.from({length: prices.length}, () => {
        return Array.from({length: 2}, () => {
            return 0;
        });
    });
    // 初始化第一天直接买入的情况
    dp[0][1] = -prices[0] - fee;
    for (let n = 1; n < prices.length; n++) {
        // 不持有： 昨天不持有，今天不变 或者 昨天持有，今天卖出获利
        dp[n][0] = Math.max(dp[n-1][0], dp[n-1][1] + prices[n]);
        // 持有： 昨天持有，今天不变 或者 昨天不持有，今天买入
        dp[n][1] = Math.max(dp[n-1][1], dp[n-1][0] - prices[n] - fee);
    }
    return dp[prices.length - 1][0]
}
// @lc code=end

console.log(maxProfit([1, 3, 2, 8, 4, 9], 2));