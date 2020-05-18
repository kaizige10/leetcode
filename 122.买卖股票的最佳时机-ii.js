/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function(prices) {
    if (prices.length < 2) return 0

    // 全部初始化成0
    let dp = Array(prices.length + 1).fill(0)
    // 第二天的最大利润为第二天减去第一天
    if (prices[1] > prices[0]) dp[2] = prices[1] - prices[0]

    for (let i = 2; i < prices.length; i++) {
        // 首先初始化为前一天的最大利润
        dp[i+1] = dp[i]
        
        for (let j = 0; j < i; j++) {
            // 计算从j到i的最大利润
            let profit = dp[j]
            if (prices[i] > prices[j]) profit += prices[i] - prices[j];
            if (profit > dp[i+1]) dp[i+1] = profit
        }
    }
    return dp[prices.length]
};

/**
 * 使用状态机框架来做
 *   不持有
 *     dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] + prices[n]);
 *   持有
 *     dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] - prices[n]);
 * 对于k=+Inf的场景，k和k-1可以认为是相同，因此可以省去第二个维度k，使用二维数组来做
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0;
    const dp = Array.from({length: prices.length}, () => {
        return Array.from({length: 2}, () => {
            return 0;
        });
    });
    // 初始化第一天直接买入的情况
    dp[0][1] = -prices[0];
    for (let n = 1; n < prices.length; n++) {
        // 不持有： 昨天不持有，今天不变 或者 昨天持有，今天卖出获利
        dp[n][0] = Math.max(dp[n-1][0], dp[n-1][1] + prices[n]);
        // 持有： 昨天持有，今天不变 或者 昨天不持有，今天买入
        dp[n][1] = Math.max(dp[n-1][1], dp[n-1][0] - prices[n]);
    }
    return dp[prices.length - 1][0]
}
// @lc code=end
console.log(maxProfit([1,2,3,4,5]))
console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit([7,6,4,3,1]))
