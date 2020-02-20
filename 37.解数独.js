/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */
 
// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 数独的思路就是递归+回溯
// 从第一行第一列开始，遇到数字就跳过，遇到空的就尝试填1,2,3,4...9，但是要注意不能填重复的数字
// 然后继续递归找下一个
// 如果到某一个空位置，发现什么都填不了，说明当前的路不通，那么就回溯
var solveSudoku = function (board) {
    // 用三个set保存当前行、列、块中可以使用的数字
    let rowSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
    let colSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
    let blockSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
    // 初始化
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let num = board[i][j]
            if (num !== '.') {
                rowSets[i].delete(num)
                colSets[j].delete(num)
                blockSets[Math.floor(i / 3) * 3 + Math.floor(j / 3)].delete(num)
            }
        }
    }
    findSolution(0, 0)
 
    function findSolution(i, j) {
        // 是数字，则跳过，继续直接往下找
        if (board[i][j] !== '.') {
            // 到最后一个了，说明找到解法了
            if (i === 8 && j === 8) return true
            // 列到最后了，找下一行
            if (j === 8) {
                return findSolution(i + 1, 0)
            } else {
                return findSolution(i, j + 1)
            }
        }
        // 是'.'，尝试填充数字
        // 当前行剩下哪几个数字没使用的，循环填充
        let rowArr = Array.from(rowSets[i].keys())
        for (let num of rowArr) {
            let blockIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
            // 当前数字是否符合条件（不在列中也不在block中）
            if (colSets[j].has(num) && blockSets[blockIndex].has(num)) {
                // 找到符合条件的数字，处理三个set，填充board
                rowSets[i].delete(num)
                colSets[j].delete(num)
                blockSets[blockIndex].delete(num)
                board[i][j] = num
                // 判断当前是否找到解法，没找到则继续往下找
                if (j === 8 && i === 8) return true
                let result
                if (j === 8) {
                    result = findSolution(i + 1, 0)
                } else {
                    result = findSolution(i, j + 1)
                }
                // 找到了返回true
                if (result) return true
                // 后面都没找到，把set和board的状态重置
                board[i][j] = '.'
                rowSets[i].add(num)
                colSets[j].add(num)
                blockSets[blockIndex].add(num)
            }
        }
        // 全部都没找到，返回false
        return false
    }
};
// @lc code=end
 
// test
let board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
 
solveSudoku(board)
console.log(board)