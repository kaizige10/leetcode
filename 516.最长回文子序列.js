/*
 * @lc app=leetcode.cn id=516 lang=javascript
 *
 * [516] 最长回文子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
    let len = s.length
    if (len <= 1) return len;
    let dp = Array.from({length: len}, () => Array.from({length: len}, ()=>0));
    // 对基本情况初始化，长度为1的子序列长度必然为1
    for (let i = 0; i < len; i++) dp[i][i] = 1;
    for (let i = len - 2; i >= 0 ; i--) {
        for (let j = i + 1; j < len ; j++) {
            if (s.charAt(i) === s.charAt(j)) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }
    return dp[0][len - 1]
};
// @lc code=end

console.log(longestPalindromeSubseq("bbbab"))
console.log(longestPalindromeSubseq("cbbd"))