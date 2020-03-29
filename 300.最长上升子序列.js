/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (!nums || nums.length === 0) return 0
    let LIS = [nums[0]]
    let index = 0
    for (let i=1; i<nums.length; i++) {
        if (nums[i] > LIS[index]) {
            LIS.push(nums[i])
            index++
        } else {
            LIS[index] = nums[i]
        }
    }
    return index + 1
};
// @lc code=end

// console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
// console.log(lengthOfLIS([-2,-1]))
console.log(lengthOfLIS([4,10,4,3,8,9]))