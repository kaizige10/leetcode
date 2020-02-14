/*
 * @lc app=leetcode.cn id=52 lang=javascript
 *
 * [52] N皇后 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    const columnSet = new Set()
    const lslashSet = new Set(), rslashSet = new Set()
    const mark = []// mark记录每次点的row和column
    let results = []

    findNQueens(0, mark, columnSet, lslashSet, rslashSet, n, results)
    return results.length
};

function findNQueens(row, mark, columnSet, lslashSet, rslashSet, n, results) {
    if (row === n) {
        // row等于n说明找到结果了，把结果塞到results数组，然后返回
        results.push(1)
        return true
    }
    for (let column = 0; column < n; column++) {
        // 每一列不重复
        // 以及每一斜对角不重复
        if (!columnSet.has(column) && !lslashSet.has(row + column) && !rslashSet.has(row - column)) {
            // 如果符合条件，把当前点的信息放到三个set和mark数组中
            columnSet.add(column)
            lslashSet.add(row + column)
            rslashSet.add(row - column)
            mark.push([row, column])
            // 继续找下一行
            let result = findNQueens(row + 1, mark, columnSet, lslashSet, rslashSet, n, results)
            // 找完以后把set和mark中的数据清理掉
            columnSet.delete(column)
            lslashSet.delete(row + column)
            rslashSet.delete(row - column)
            mark.pop()
            // 找到结果则返回,因为每一行只有一个皇后
            if (result) {
                return
            }
        }
    }
}
// @lc code=end

