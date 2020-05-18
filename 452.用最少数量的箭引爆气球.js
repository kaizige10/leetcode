/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if (points.length === 0) return 0;

    points.sort((p1, p2) => p1[1] - p2[1]);

    let lastPoint = points[0]
    let count = 1;
    for (let i = 1; i < points.length; i++) {
        if (lastPoint[1] < points[i][0]) {
            count++;
            lastPoint = points[i]
        }
    }
    return count;
};
// @lc code=end

