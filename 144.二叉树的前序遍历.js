/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * @return {number[]}
 */
// 思路2：迭代
var preorderTraversal = function(root) {
    if (!root) return []
    let stack = [root], result = []
    while(stack.length > 0) {
        let cur = stack.pop()
        result.push(cur.val)
        cur.right && stack.push(cur.right)
        cur.left && stack.push(cur.left)
    }
    return result
}
// 思路1：递归
var preorderTraversal1 = function(root) {
    if (!root) return []

    let result = []
    result.push(root.val)
    root.left && result.push(...preorderTraversal(root.left))
    root.right && result.push(...preorderTraversal(root.right))

    return result
};
// @lc code=end

