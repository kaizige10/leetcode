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
// var longestPalindromeSubseq1 = function(s) {
//     function longest(left, right) {
//         if (left === right) {
//             return 1;
//         }
//         if (left > right) {
//             return 0;
//         }
//         if (s.charAt(left) !== s.charAt(right)) {
//             // 如果不相等，那么找left -> right-1 和 left+1 -> right的更大值
//             return Math.max(longest(left, right - 1), longest(left + 1, right));
//         } else {
//             // 如果左右相等，那么继续找
//             return longest(left + 1, right - 1) + 2;
//         }
//     }
 
//     return longest(0, s.length - 1);
// };
 
var longestPalindromeSubseq2 = function(s) {
    let length = s.length
    if (length === 1 || s === s.split('').reverse().join('')) {
        return length
    }
    // 初始化长度为0
    let f = Array.from({ length }, () => Array.from({ length }, () => 0));
    for (let i = length-1; i >= 0; i--) {
        f[i][i] = 1;
        for (let j = i + 1; j < length; j++) {
            if (s.charAt(i) === s.charAt(j)) {
                f[i][j] = f[i+1][j-1] + 2
            } else {
                f[i][j] = Math.max(f[i][j-1], f[i+1][j])
            }
        }
    }
    return f[0][length-1]
};
var longestPalindromeSubseq = function(s) {
    let length = s.length
    if (length === 1 || s === s.split('').reverse().join('')) {
        return length
    }
    // 初始化长度为1
    let f = Array.from({ length }, () => 1);
    for (let i = length-1; i >= 0; i--) {
        let temp = 0
        for (let j = i + 1; j < length; j++) {
            if (s.charAt(i) === s.charAt(j)) {
                [temp, f[j]] = [f[j], temp + 2]
            } else {
                temp = f[j-1]
                f[j] = Math.max(f[j-1], f[j])
            }
        }
    }
    return f[length-1]
};
// @lc code=end
 
// test
// console.log(
//     longestPalindromeSubseq(
//         'euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew'
//     )
// );
console.log(longestPalindromeSubseq('abxyzcdmba') === 5);
console.log(longestPalindromeSubseq('abacadaeaf') === 5);
console.log(longestPalindromeSubseq('cbbd') === 2);
console.log(longestPalindromeSubseq('bbbab') === 4);
console.log(longestPalindromeSubseq('axabxb') === 3);
console.log(longestPalindromeSubseq('a') === 1);
console.log(longestPalindromeSubseq('aa') === 2);
console.log(longestPalindromeSubseq('aba') === 3);
console.log(longestPalindromeSubseq('abc') === 1);
console.log(longestPalindromeSubseq('ababc') === 3);
