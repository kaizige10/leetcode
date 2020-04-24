/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * 动态规划dp数组解法
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    let slen = s.length, plen = p.length
    let dp = Array.from({ length: slen + 1 }, () => Array.from({ length: plen + 1 }, () => false));

    for (let i = 0; i <= plen; i++) {
        if (i === 0) {
            dp[0][i] = true;
        } else if (p.charAt(i - 1) === '*') {
            dp[0][i] = dp[0][i - 2]
        } else {
            dp[0][i] = false;
        }
    }

    for (let i = 0; i < slen; i++) {
        for (let j = 0; j < plen; j++) {
            if (s.charAt(i) === p.charAt(j) || p.charAt(j) === '.') {
                // si和pj相等，或者pj为.
                dp[i + 1][j + 1] = dp[i][j]
            } else if (p.charAt(j) === '*') {// pj为*
                let matchZero = dp[i + 1][j - 1];// 匹配0次
                let matchOnce = (p.charAt(j - 1) === s.charAt(i) || p.charAt(j - 1) === '.') && dp[i][j + 1];// 匹配1次
                dp[i + 1][j + 1] = matchZero || matchOnce;
            } else {
                dp[i + 1][j + 1] = false;// si和pj不相等
            }
        }
    }
    // console.log(dp)
    return dp[slen][plen]
};

// @lc code=end

console.log(isMatch('cb', 'ca*b'))
// console.log(isMatch('caaaab', 'ca*b'))
// console.log(isMatch('ccb', 'ca*b'))
// console.log(isMatch('ab', '.*'))
// console.log(isMatch('mississippi', 'mis*is*p*.'))