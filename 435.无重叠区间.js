/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 0 ) return 0

    intervals.sort((a, b) => a[1] - b[1])

    let count = 0;
    let last = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        if (last[1] > intervals[i][0]) {
            count++
        } else {
            last = intervals[i]
        }
    }
    return count;
};
// @lc code=end

