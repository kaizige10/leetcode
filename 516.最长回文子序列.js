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
var longestPalindromeSubseq1 = function(s) {
    let map = new Map()
    // 先循环一遍，把每个字符计算到hash表，方便后面用
    for (let i = 0; i < s.length; i++) {
        let str = s.charAt(i)
        if (map.has(str)) {
            map.set(str, map.get(str).concat([i]))
        } else {
            map.set(str, [i])
        }
    }

    function longest(left, right) {
        if (left === right) {
            return 1;
        }
        if (left > right) {
            return 0;
        }
        let leftStr = s.charAt(left)
        if (leftStr !== s.charAt(right)) {
            // 左右不相等，那么找到和左边相等的right
            let arr = map.get(leftStr)
            if (arr.length === 1 || arr.length === 0) {
                // 长度为1，说明找不到和left相同的字符，那么找下一个
                return longest(left+1, right)
            } else {
                leftMirror = arr[arr.length - 1]
                let pickLen = longest(left + 1, leftMirror - 1) + 2
                let notPickLen = longest(left + 1, right)
                return Math.max(pickLen, notPickLen)
            }
        } else {
            // 如果左右相等，那么继续找
            return longest(left + 1, right - 1) + 2
        }
    }

    return longest(0, s.length - 1);
};


var longestPalindromeSubseq = function(s) {
    function longest(left, right) {
        if (left === right) {
            return 1;
        }
        if (left > right) {
            return 0;
        }
        let leftStr = s.charAt(left)
        if (leftStr !== s.charAt(right)) {
            // 左右不相等，那么找到和左边相等的right
            let sameRight = right - 1
            while (sameRight > left && s.charAt(sameRight) !== leftStr) {
                sameRight--
            }
            // 如果sameRight等于left，说明找不到和leftStr相同的字符
            if (sameRight === left) {
                // 长度为1，说明找不到和left相同的字符，那么找下一个
                return longest(left + 1, right)
            } else {
                let pickLen = longest(left + 1, sameRight - 1) + 2
                let notPickLen = longest(left + 1, right)
                return Math.max(pickLen, notPickLen)
            }
        } else {
            // 如果左右相等，那么继续找
            return longest(left + 1, right - 1) + 2
        }
    }

    return longest(0, s.length - 1);
}

// @lc code=end

// test
console.log(longestPalindromeSubseq('axabxb'))
// console.log(longestPalindromeSubseq('a') === 1)
// console.log(longestPalindromeSubseq('aa') === 2)
// console.log(longestPalindromeSubseq('aba') === 3)
// console.log(longestPalindromeSubseq('abc') === 1)
// console.log(longestPalindromeSubseq('ababc')===3)