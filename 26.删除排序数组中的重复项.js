/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length <= 1) return nums.length
    let i = 0, j = 1
    while(j < nums.length) {
        if (nums[i] === nums[j]) {
            j++
        } else {
            nums[++i] = nums[j++]
        }
    }
    return i+1
};
// @lc code=end

