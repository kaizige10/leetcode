/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (s === p) return true;
    let plen = p.length,
        slen = s.length;
    let dp = Array.from({ length: plen + 1 }, () => Array.from({ length: slen + 1 }, () => false));
    dp[0][0] = true;
    if (dp.length > 1) dp[1][0] = false;
    for (let j = 2; j <= plen; j++) {
        // 初始化第一列
        if (p.charAt(j - 1) !== '*') {
            dp[j][0] = false;
        } else {
            dp[j][0] = dp[j - 2][0];
        }
    }
    // console.table(dp);

    for (let j = 1; j <= plen; j++) {
        for (let i = 1; i <= slen; i++) {
            if (s.charAt(i - 1) === p.charAt(j - 1)) {
                // 当前相等，则匹配可以成功，结果等于dp[i-1][j-1]
                dp[j][i] = dp[j - 1][i - 1];
            } else {
                // 当前不相等，有三种情况：
                if (p.charAt(j - 1) === '.') {
                    // 若p为. 则可以匹配，结果等于dp[i-1][j-1]
                    dp[j][i] = dp[j - 1][i - 1];
                } else if (p.charAt(j - 1) === '*') {
                    // 若p为* 则必须pj-1等于si或者等于.才能匹配 并且dp[j-2][i-1]或者dp[j][i - 1]要为true
                    dp[j][i] = (dp[j - 2][i - 1] || dp[j][i - 1]) && (p.charAt(j - 2) === s.charAt(i - 1) || p.charAt(j - 2) === '.');
                    // 还有一种情况是匹配了0个字符，那么就可以看dp[j- 2][i]是否为true
                    if (j - 2>= 0) {
                        dp[j][i] = dp[j][i] || dp[j- 2][i]
                    }
                } else {
                    // p为普通字符，肯定不匹配
                    dp[j][i] = false;
                }
            }
        }
    }
    // console.table(dp);
    return dp[plen][slen];
};
// @lc code=end

// console.log(isMatch('aa', 'a'))
// console.log(isMatch('aa', 'a*'));
// console.log(isMatch('ab', '.*'));
// console.log(isMatch('aab', 'c*a*b'));
// console.log(isMatch('mississippi', 'mis*is*p*.'));
// console.log(isMatch("aaa","ab*ac*a"));
// console.log(isMatch("aaa","ab*a*c*a"));