/*
 * @lc app=leetcode.cn id=892 lang=javascript
 *
 * [892] 三维形体的表面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
    let len = grid.length
    let topArea = 0
    let leftArea = 0
    let frontArea = 0
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            // 计算上下面积
            if (grid[i][j] > 0) topArea += 2
            // 计算左边
            if (j === 0) {
                leftArea += grid[i][j]
            } else {
                grid[i][j] > grid[i][j - 1] && (leftArea += grid[i][j] - grid[i][j - 1])
            }
            // 右边
            if (j === len - 1) {
                leftArea += grid[i][j]
            } else {
                grid[i][j] > grid[i][j + 1] && (leftArea += grid[i][j] - grid[i][j + 1])
            }
            // 计算前面
            if (i === 0) {
                frontArea += grid[i][j]
            } else {
                grid[i][j] > grid[i - 1][j] && (frontArea += grid[i][j] - grid[i - 1][j])
            }
            // 计算后面
            if (i === len - 1) {
                frontArea += grid[i][j]
            } else {
                grid[i][j] > grid[i + 1][j] && (frontArea += grid[i][j] - grid[i + 1][j])
            }
        }
    }
    console.log(frontArea, leftArea, topArea);
    
    return frontArea + leftArea + topArea
};
// @lc code=end

console.log(surfaceArea([[1,2],[3,4]]))