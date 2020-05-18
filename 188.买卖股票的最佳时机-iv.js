/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// @lc code=start

/**
 * 使用状态机框架来做
 *   不持有
 *     dp[n][k][0] = Math.max(dp[n-1][k][0], dp[n-1][k][1] + prices[n]);
 *   持有
 *     dp[n][k][1] = Math.max(dp[n-1][k][1], dp[n-1][k-1][0] - prices[n]);
 * 对于k=2的场景，只能用三维数组
 * @param {number} K
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(K, prices) {
    if (prices.length < 2) return 0;

    // 最大可交易次数只能为交易天数的一半
    // 这个是为了防止K超大导致内存溢出
    if (K > prices.length) K = Math.ceil(prices.length / 2)

    const dp = Array.from({ length: K + 1 }, (b, k) => {
        return Array.from({ length: 2 }, (c, rest) => {
            // 对于k=0，还持有的状态是不存在的，初始化为无穷小的负数
            if (k === 0 && rest === 1) return -Number.MAX_VALUE;
            // 初始化第一天直接买入的情况
            if (k !== 0) return -prices[0];
            return 0;
        });
    });
    let max = 0;
    for (let n = 1; n < prices.length; n++) {
        for (let k = 1; k <= K; k++) {
            let hold = dp[k][1];
            let notHold = dp[k][0];
            // 不持有： 昨天不持有，今天不变 或者 昨天持有，今天卖出获利
            dp[k][0] = Math.max(notHold, hold + prices[n]);
            // 持有： 昨天持有，今天不变 或者 昨天不持有，今天买入
            dp[k][1] = Math.max(hold, dp[k - 1][0] - prices[n]);

            max = Math.max(dp[k][0], max);
        }
    }
    return max;
}
// @lc code=end

// console.log(maxProfit(2, [3,2,6,5,0,3]));
// console.log(maxProfit(2, [2,4,1]));