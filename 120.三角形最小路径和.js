/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
// 自顶向下
var minimumTotal = function(triangle) {
    let len = triangle.length;
    let res = Array.from({ length: len }, () => 0);
    let min = Number.MAX_VALUE
    for (let i = 0; i < len; i++) {
        let colLen = triangle[i].length;
        // 用temp保存上一列的res[j]
        let temp
        for (let j = 0; j < colLen; j++) {
            if (j === 0) {
                // 第0列，只需要加上上一行的第0列
                temp = res[j]
                res[j] = res[j] + triangle[i][j];
            } else if (j === colLen - 1) {
                // 最后1列，只需要加上上一行的最后1列
                [temp , res[j]] = [res[j], temp + triangle[i][j]];
            } else {
                // 中间列，要同时计算上一行的j和j-1列
                [temp, res[j]] = [res[j], Math.min(temp + triangle[i][j], res[j] + triangle[i][j])];
            }
            // 最后一行时找最小值
            if (i===len-1 && min > res[j]) min = res[j]
        }
    }
    return min;
};
 
// 自底向上，速度更快一点
var minimumTotal = function(triangle) {
    if (triangle.length === 0) return triangle[0][0]
 
    let len = triangle.length;
    // 初始化res数组为最后一行
    let res = Array(len);
    for(let j=0;j<len;j++) res[j] = triangle[len-1][j]
 
    for (let i = len - 2; i >= 0; i--) {
        let colLen = triangle[i].length;
        for (let j = 0; j < colLen; j++) {
            res[j] = Math.min(res[j] + triangle[i][j], res[j + 1] + triangle[i][j])
        }
    }
    return res[0];
};
// @lc code=end

