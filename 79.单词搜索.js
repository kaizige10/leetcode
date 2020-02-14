/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
// 思路：遍历 + 递归
// 外层遍历二维数组，匹配第一个字母时进入find函数
// find函数内部对上下左右四个方向寻找下一个字母
// 如果找到了就继续递归调用，找不到就回溯
// 进入find时用一个set保存已经匹配的字符的位置，找到匹配的字符就add，找不到就delete
var exist = function(board, word) {
    let index = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === word.charAt(index)) {
                if (word.length === index + 1) return true
                let set = new Set([`${i},${j}`])
                if (find(board, set, word, i, j, index + 1)) return true
            }
        }
    }
    return false
};

function find(board, set, word, i, j, index) {
    // 上下左右
    let arr = [[i-1,j], [i, j+1], [i+1, j], [i, j-1]]
    for (let t = 0; t < arr.length; t++) {
        let [p, k] = arr[t]
        if (board[p] && board[p][k] === word.charAt(index) && !set.has(`${p},${k}`)) {
            // console.log(`${word.charAt(index)}: ${p}, ${k}`)
            if (word.length === index + 1) return true
            set.add(`${p},${k}`)
            if (find(board, set, word, p, k, index + 1)) return true
        }
    }
    set.delete(`${i},${j}`)
    return false
}
// @lc code=end

// let board = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]]
// let word = "ABCEFSADEESE"
// let re = exist(board, word)
// console.log(re)