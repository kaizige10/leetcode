/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function(prices) {
    if (prices.length < 2) {
        return 0;
    }
    let minPrice = prices[0]
    let max = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > minPrice) {
            let profit = prices[i] - minPrice
            if (profit > max) {
                max = profit
            }
        } else {
            minPrice = prices[i]
        }
    }
    return max;
};

/**
 * 使用状态机框架来做
 *   不持有
 *     dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] + prices[n]);
 *   持有
 *     dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] - prices[n]);
 * 对于k=1的场景，dp[n-1][k-1][0]就是0，因此可以省掉第二维度k，用二维数组来做就可以了
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
        dp[n][1] = Math.max(dp[n-1][1], -prices[n]);
    }
    return dp[prices.length - 1][0]
}
// @lc code=end

maxProfit([3,3,5,0,0,3,1,4])
maxProfit([7,1,5,3,6,4])
maxProfit([7,6,4,3,1])