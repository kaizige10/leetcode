/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * @return {number}
 */
// 思路1：递归地找左右子树的最大深度，然后取最大值 + 1
var maxDepth = function(root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
// 思路2：迭代，BFS
// 通过广度优先搜索，一层层地找，找到最底层的高度即为树的最大高度

// 思路3：迭代，DFS
// 使用栈保存每个节点和其高度
// 遍历完所有节点以后，即可得到最大高度
// @lc code=end

