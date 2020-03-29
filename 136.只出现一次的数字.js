/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let ans = 0
    nums.forEach(item => {
        // console.log(ans);
        
        ans = ans ^ item
    })
    return ans
};
// @lc code=end

// singleNumber([2,2,1])