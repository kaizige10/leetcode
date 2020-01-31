/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
// 使用栈保存还未处理的中间节点，只要有左节点就入栈
// 没有左节点时，把当前节点出栈，val保存到result
// 有右节点时，入栈，继续循环
// 为了防止出栈的节点在下次循环又把其左节点入栈，
// 使用一个额外的变量isVisited保存该节点是否访问过
var inorderTraversal = function (root) {
    if (!root) return []
    let result = [], stack = [root], cur = root, isVisited
    while(stack.length > 0) {
        if (cur.left && cur != isVisited) {
            stack.push(cur.left)
            cur = cur.left
        } else {
            cur = stack.pop()
            result.push(cur.val)
            isVisited = cur
            if (cur.right) {
                stack.push(cur.right)
                cur = cur.right
            }
        }
    }
    return result
}
// 思路1: 递归
var inorderTraversal1 = function (root) {
    if (!root) return []
    let result = []
    root.left && result.push(...inorderTraversal(root.left))
    result.push(root.val)
    root.right && result.push(...inorderTraversal(root.right))
    return result
};
// @lc code=end

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// let root = new TreeNode(2)
// let node1 = new TreeNode(3)
// let node2 = new TreeNode(1)
// root.left = node1
// node1.left = node2

// let res = inorderTraversal(root)
// console.log(res);
