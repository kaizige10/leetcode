/*
 * @lc app=leetcode.cn id=914 lang=javascript
 *
 * [914] 卡牌分组
 */

// @lc code=start
/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
    if (deck.length <= 1) return false
    // 计数排序
    let min = 10001, max = -1
    deck.forEach(item => {
        min > item && (min = item)
        max < item && (max = item)
    })
    let tempArr = Array.from({ length: max - min + 1 }, () => 0)
    deck.forEach(item => {
        tempArr[item - min]++
    })
    // 找到最小的分组的数量
    let minX = 10001
    tempArr.forEach(item => {
        if (item !== 0 && minX > item) minX = item
    })
    console.table(tempArr)
    console.log(minX)
    if (minX < 2) return false
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] !== 0 && getMax(tempArr[i], minX) <= 1) {
            return false
        }
    }
    return true
};

function getMax(a, b) {
    if (a===b) return a
    let big = a > b ? a : b;
    let small = a > b ? b : a;
    let yushu = big % small
    while (yushu > 0) {
        [big, small] = [small, yushu]
        yushu = big % small
    }
    return small
}
// @lc code=end

// console.log(hasGroupsSizeX([1,2,3,4,4,3,2,1,1, 1]))
console.log(hasGroupsSizeX([1, 1, 1, 1, 2, 2, 2, 2, 2, 2]))


// console.log(getMax(40, 16))
// console.log(getMax(4,6))