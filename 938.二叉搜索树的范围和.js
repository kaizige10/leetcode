/*
 * @lc app=leetcode.cn id=938 lang=javascript
 *
 * [938] 二叉搜索树的范围和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function (root, L, R) {
    if (!root) return 0
    let result = 0
    if (L <= root.val && root.val <= R) result += root.val
    if (root.val > L) result += rangeSumBST(root.left, L, R)
    if (root.val < R) result += rangeSumBST(root.right, L, R)
    return result
};
// @lc code=end

// let node10 = {val: 10}
// let node5 = {val: 5}
// let node15 = {val: 15}
// let node3 = {val: 3}
// let node7 = {val: 7}
// let node18 = {val: 18}

// node10.left = node5
// node10.right = node15
// node5.left=node3
// node5.right=node7
// node15.right=node18

// let re = rangeSumBST(node10, 7,15)
// console.log(re)