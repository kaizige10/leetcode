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
var solveSudoku = function (board) {
    let rowSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
    let colSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
    let blockSets = Array.from({ length: 9 }, () => new Set(["1", "2", "3", "4", "5", "6", '7', '8', '9']))
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
        // 是数字
        if (board[i][j] !== '.') {
            console.log(`开始找i=${i},j=${j}, 已存在数字${board[i][j]}，跳过`)
            // 到最后一个了，说明找到解法了
            if (i === 8 && j === 8) return true
            // 列到最后了，找下一行
            if (j === 8) {
                return findSolution(i + 1, 0)
            } else {
                return findSolution(i, j + 1)
            }
        }
        // 是'.'
        // 从行里面循环得找
        console.log(`开始找i=${i},j=${j},剩余的rowSets有：${Array.from(rowSets[i].keys())}`)
        let tmpArr = []
        for (let num of rowSets[i].keys()) {
            let index = Math.floor(i / 3) * 3 + Math.floor(j / 3)//TODO移动到if里面去
            // 当前num是否符合条件
            if (colSets[j].has(num) && blockSets[index].has(num)) {
                console.log(`先把${num}放进去`)
                rowSets[i].delete(num)
                colSets[j].delete(num)
                blockSets[index].delete(num)
                board[i][j] = num
                tmpArr.push(num)
                // 到最后一个了，说明找到解法了
                if (j === 8 && i === 8) return true
                let result
                if (j === 8) {
                    result = findSolution(i + 1, 0)
                } else {
                    result = findSolution(i, j + 1)
                }
                // 找到了返回true
                if (result) return true
            }
        }
        console.log(`当前i=${i},j=${j}，没找到。tmpArr=${tmpArr}`)
        // 没找到，把状态重置
        tmpArr.forEach(num => {
            rowSets[i].add(num)
            colSets[j].add(num)
            blockSets[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(num)
        })
        board[i][j] = '.'
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