/*
 * @lc app=leetcode.cn id=1248 lang=javascript
 *
 * [1248] 统计「优美子数组」
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    let left = 0, right = 0
    let res = 0,  oddIdxs = [];
    while(right < nums.length) {
        if (oddIdxs.length <= k) {
            if (nums[right] & 1 === 1) {
                oddIdxs.push(right);
            }
            if (oddIdxs.length === k) res += oddIdxs[0] - left + 1;
            right++
        } else {
            left = oddIdxs.shift() + 1;
            if (oddIdxs.length === k) res += oddIdxs[0] - left + 1;
        }
    }
    if (oddIdxs.length > k) {
        left = oddIdxs.shift() + 1
        res += oddIdxs[0] - left + 1;
    }
    return res;
};
// @lc code=end

// console.log(numberOfSubarrays([1,1,2,1,1], 3))
// console.log(numberOfSubarrays([2,4,6], 1))
// // console.table([2,2,2,1,2,2,1,2,2,2])
// console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], 2))
console.log(numberOfSubarrays([1,1,1,1,1], 1))

