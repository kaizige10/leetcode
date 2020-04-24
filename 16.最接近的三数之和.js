/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a,b) => a-b)// 排序
    let right = nums.length - 1
    let maxsum = nums[right] + nums[right-1] + nums[right-2]
    let minsum = nums[0] + nums[1] + nums[2]
    if (minsum >= target) return minsum
    if (maxsum <= target) return maxsum

    let min = maxsum - target
    for (let fix = 0; fix < nums.length-2;fix++) {
        for (let l = fix+1, r=nums.length-1; l<r; ) {
            let dis = nums[fix] +nums[l] +nums[r] - target

            if (Math.abs(dis) < Math.abs(min)) min = dis
            
            if (dis < 0) {
                l++
            } else {
                r--
            }
        }
    }
    return min + target
};
// @lc code=end

