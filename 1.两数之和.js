/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const need = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (need.has(target - nums[i])) {
            return [need.get(target - nums[i]), i]
        } else {
            need.set(nums[i], i)
        }
    }
};
// @lc code=end

