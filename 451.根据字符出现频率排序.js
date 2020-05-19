/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    if (s.length <= 1) return s;
    // 初始化map(str -> count)
    const map = new Map();
    s.split('').forEach(ch => map.set(ch, map.has(ch) ? map.get(ch) + 1 : 1));
    // 将map的数据转成数组
    const arr = [];
    map.forEach((val, key) => arr.push({str: key, count: val}));
    // 按照频率降序排列
    arr.sort((a, b) => b.count - a.count);
    // 输出结果
    return arr.map(({str, count}) => {
        return Array(count).fill(str).join('');
    }).join('');
};
// @lc code=end

// console.log(frequencySort('tree'));
// console.log(frequencySort('cccaaa'));
// console.log(frequencySort('Aabb'));