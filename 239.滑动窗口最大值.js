/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * 版本1，暴力法
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    if (k === 1) return nums;
    let { max, maxIdx } = findMax(nums, 0, k - 1);
    let l = 1, r = k;
    const result = [max];
    while (r < nums.length) {
        if (maxIdx < l) {
            // 最大值到窗口外面去了，重新找最大值
            let newObj = findMax(nums, l, r);
            max = newObj.max;
            maxIdx = newObj.maxIdx;
        } else if (nums[r] > max) {
            max = nums[r];
            maxIdx = r;
        }
        result.push(max);
        l++;
        r++;
    }
    return result;
};

function findMax(nums, start, end) {
    let max = nums[start], maxIdx = start;
    for (let i = start + 1; i <= end; i++) {
        if (max < nums[i]) {
            max = nums[i];
            maxIdx = i;
        }
    }
    return { max, maxIdx };
}
// @lc code=end

