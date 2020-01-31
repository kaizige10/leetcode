/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
// 思路1：递归
var postorderTraversal1 = function(root) {
    if (!root) return []

    let result = []
    root.left && result.push(...postorderTraversal(root.left))
    root.right && result.push(...postorderTraversal(root.right))
    result.push(root.val)

    return result
};
// 思路2：迭代
// 使用栈保存已遍历但是暂时不处理的节点，
// 为了防止循环处理同一个节点，用哈希表存储已访问过的节点
// 若当前节点无左右子节点时，说明是叶子节点，值可以直接保存到结果
// 若当前节点有左无右（或者有右无左），要先处理左节点（或右节点），因此把当前节点入栈
// 若当前节点有左右子节点，要先处理左子节点再处理右子节点，因此把当前节点和右子节点入栈
// 若当前节点已存在于哈希表，说明左右子节点已处理完毕，因此把值保存到结果
var postorderTraversal = function (root) {
    if (!root) return []
    let stack = [], cur = root, result = [], isVisited = new Set()
    while (cur) {
        if (isVisited.has(cur)) {
            result.push(cur.val)
            cur = stack.pop()
        } else {
            isVisited.add(cur)
            if (cur.right && cur.left) {
                stack.push(cur)
                stack.push(cur.right)
                cur = cur.left
            } else if (cur.right && !cur.left) {
                stack.push(cur)
                cur = cur.right
            } else if (cur.left && !cur.right) {
                stack.push(cur)
                cur = cur.left
            } else if (!cur.left && !cur.right) {
                result.push(cur.val)
                cur = stack.pop()
            }
        }
    } 
    return result
}
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// let root = new TreeNode(1)
// let node1 = new TreeNode(2)
// let node2 = new TreeNode(3)
// root.left = node1
// node1.left = node2

// let res = postorderTraversal(root)
// console.log(res);
// @lc code=end

