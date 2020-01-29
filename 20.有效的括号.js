/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
const dict = { '}': '{', ']': '[', ')': '(' }
var isValid = function (s) {
    const stack = []
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (c === '{' || c === '[' || c === '(') {
            stack.push(c)
        } else if (stack.pop() !== dict[c]) {
            return false
        }
    }
    return stack.length === 0
};
// @lc code=end

