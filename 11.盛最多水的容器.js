/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 暴力计算法
// 时间18.09 %  内存42.73 %
var maxArea1 = function (height) {
    let area = -Number.MAX_VALUE
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            let small = height[i] < height[j] ? height[i] : height[j]
            let curArea = small * (j - i)
            area < curArea && (area = curArea)
        }
    }
    return area
};

// 双指针移动找最大值
// 时间83.59 %  内存90.12 %
// 思路：双指针先设置为头和尾，假设此时的最大面积就是头尾的组合
// 然后想通过移动指针来找更大的面积，那么就要移动高度较短的指针
// 原因：如果移动较高的那个指针，那么接下来得到的面积一定小于当前的面积
// 因此移动较小高度的指针，比较得到最大的面积，循环下去就可以得到最大面积

var maxArea = function (height) {
    let max = -Number.MAX_VALUE
    let i = 0, j = height.length - 1
    while (i < j) {
        let area = (j - i) * Math.min(height[j], height[i])
        max < area && (max = area)
        height[i] < height[j] ? i++ : j--
    }
    return max
}
// @lc code=end

// test
// let re = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])
// console.log(re)