/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length,
        n = obstacleGrid[0].length;
    if (obstacleGrid[0][0] || obstacleGrid[m - 1][n - 1]) {
        return 0;
    }
    let f = Array.from({ length: m }, () => Array.from({ length: n }, () => 1));
    // 初始化最后一行
    let hasObstacle = false
    for (let j = n-1;j>=0;j--) {
        if (obstacleGrid[m-1][j]) hasObstacle = true
        f[m-1][j] = hasObstacle ? 0 : 1
    }
    // 初始化最后一列
    hasObstacle = false
    for (let i = m - 1; i >= 0; i--) {
        if (obstacleGrid[i][n-1]) hasObstacle = true
        f[i][n-1] = hasObstacle ? 0 : 1
    }
    for (let i = m - 2; i >= 0; i--) {
        for (let j = n - 2; j >= 0; j--) {
            // 先求出右边的路径数
            let right = obstacleGrid[i][j + 1] ? 0 : f[i][j + 1];
            // 求出下边的路径数
            let down = obstacleGrid[i + 1][j] ? 0 : f[i + 1][j];
            f[i][j] = down + right;
        }
    }
    return f[0][0];
};
// @lc code=end

// let obstacleGrid1 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
// console.log(uniquePathsWithObstacles(obstacleGrid1) === 2);
// let obstacleGrid2 = [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]];
// console.log(uniquePathsWithObstacles(obstacleGrid2) === 3);
// let obstacleGrid3 = [[1]];
// console.log(uniquePathsWithObstacles(obstacleGrid3) === 0);
// let obstacleGrid4 = [[0, 0], [1, 1], [0, 0]];
// console.log(uniquePathsWithObstacles(obstacleGrid4) === 0);