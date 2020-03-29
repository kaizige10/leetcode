/*
 * @lc app=leetcode.cn id=695 lang=javascript
 *
 * [695] 岛屿的最大面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let max = -1
    let row = grid.length, col = grid[0].length;
    // hasFindArr保存已经找过的区域
    let hasFindArr = Array.from({length: row}, () => Array.from({length: col}, () => 0));

    for (let i=0; i< grid.length; i++) {
        for (let j=0; j< grid[0].length; j++) {
            let area = getArea(i, j);
            max < area && (max = area)
        }
    }

    function getArea(i, j) {
        // 已经找过了，跳过去
        if (hasFindArr[i][j]) return 0
        // 此处没有岛屿
        if (grid[i][j] === 0) {
            hasFindArr[i][j] = 1
            return 0
        }
        hasFindArr[i][j] = 1
        // 上下左右四个方向寻找岛屿
        let four = [[i-1, j], [i, j+1], [i+1, j], [i, j-1]]
        let curArea = 1
        for(let k=0;k<4;k++) {
            let [m, n] = four[k]
            if (m < 0 || m >= row || n < 0 || n >= col) {
                continue
            } else {
                // 没有越界，那么继续找
                curArea += getArea(m, n)
            }
        }
        return curArea
    }

    return max;
};
// @lc code=end

console.log(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]]))
