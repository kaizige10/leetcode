// https://www.bilibili.com/read/cv1317503?from=search
// https://zhuanlan.zhihu.com/p/70532099
/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start

/**
 * 辅助函数：中心扩展计算i点长度
 * @param {*} P 
 * @param {*} i 
 * @param {*} originLen 
 */
function getLen(P, i, originLen) {
    let l = i - originLen, r = i + originLen, len = originLen
    while (P[l] == P[r] && r < P.length && l >= 0) {
        if (P[l] !== '#') {
            len += 2
        }
        l--
        r++
    }
    return len
}

/**
 * 马拉车算法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    // P数组保存重构后的字符串
    let P = ['^', '#']
    for (let i = 0; i < s.length; i++) {
        P.push(s.charAt(i), '#')
    }
    P.push('$')
    // T数组保存每个字符为中心的最大回文长度
    let T = Array.from({ length: s.length * 2 + 3 }, () => 0)
    // 定义中心点C和他的右侧半径的点R
    let C = 2, R = 0
    // 开始计算T的值
    let maxLenIndex = 2, maxLen = 1;
    P.forEach((str, i) => {
        // ^$不用计算，就是0
        if (str === '^' || str === '&') {
            T[i] = 0
        } else {
            // 如果当前点i超过了R，进行中心扩展
            // 以及对称点为0，也进行扩展
            let i_m = C - (i - C)// 找到对称点
            let len_m = T[i_m]
            if (i + len_m < R) {
                // i点的右边界小于R,此时直接可以知道T[i]=T[i_m]
                T[i] = len_m
            } else {
                let originLen, len
                // 开始进行扩展
                if (i < R && i + len_m >= R) {
                    // i在R内部，但是i的右边界在外部，那么直接从R-i处开始扩展
                    originLen = R - i
                } else {
                    // i在外部，从头开始扩展
                    // 对'#'来说，长度应该从0开始
                    originLen = P[i] === '#' ? 0 : 1
                }
                len = getLen(P, i, originLen)
                T[i] = len;
                [C, R] = [i, i + len]
            }
        }
        // 保存最大子串的下标
        if (maxLen < T[i]) {
            maxLen = T[i]
            maxLenIndex = i
        }
    });
    // -1以后变成偶数，除以2时正好得到半径
    maxLen -= 1
    // 先找到P数组中左右index
    let left = maxLenIndex - maxLen
    let right = maxLenIndex + maxLen
    // 再计算真实的左右指针
    left = (left - 2) / 2
    right = (right - 2) / 2
    return s.substring(left, right + 1)
};

// 思路2：中心扩展法
var longestPalindrome2 = function (s) {
    let cIndex = 0, maxLen = 1;
    for (let i = 0; i < s.length; i++) {
        // 考虑奇数
        let l = i - 1, r = i + 1, len = 1
        while (r < s.length && l >= 0 && s.charAt(l) == s.charAt(r)) {
            l--
            r++
            len+=2
        }
        if (maxLen < len) {
            maxLen = len
            cIndex = l+1
        }
        if (s.charAt(i) == s.charAt(i+1)) {
            // 考虑偶数
            let l = i - 1, r = i + 2, len = 2
            while (r < s.length && l >= 0 && s.charAt(l) == s.charAt(r)) {
                l--
                r++
                len+=2
            }
            if (maxLen < len) {
                maxLen = len
                cIndex = l+1
            }
        }
    }
    return s.substr(cIndex, maxLen)
}

// @lc code=end

//test
// console.log(longestPalindrome('babadada') === 'adada')
// console.log(longestPalindrome('a') === 'a')
// console.log(longestPalindrome('ccc') === 'ccc')
// console.log(longestPalindrome('caac') === 'caac')
// console.log(longestPalindrome('cabadabae') === 'abadaba')
// console.log(longestPalindrome('babad') === 'bab')
// console.log(longestPalindrome('cbbd') === 'bb')



