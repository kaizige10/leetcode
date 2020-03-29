/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let len = nums.length
    // i指向0的最后一个
    // j指向2的第一个
    let i = -1, j = len
    for (let cur = 0; cur < len && cur < j;) {
        if (nums[cur] === 0) {
            [nums[cur], nums[i]] = [nums[++i], nums[cur]]
            cur++
        } else if (nums[cur] === 2) {
            if (cur !== --j) {
                [nums[cur], nums[j]] = [nums[j], nums[cur]]
            } else [
                cur++
            ]
        } else {
            cur++
        }
    }
};
// @lc code=end

var nums = [2,0,2,1,1,0]
sortColors(nums)
console.log(nums);
var nums = [1,1,2,0,2,1,0]
sortColors(nums)
console.log(nums);
var nums = [2, 0]
sortColors(nums)
console.log(nums);
