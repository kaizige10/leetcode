/*
 * @lc app=leetcode.cn id=590 lang=javascript
 *
 * [590] N叉树的后序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder1 = function (root) {
    if (!root) return []
    let result = []
    if (root.children) {
        root.children.forEach(item => result.push(...postorder(item)))
    }
    result.push(root.val)
    return result
};
// 迭代，使用额外的空间保存当前的子节点是否处理过
// 处理过则直接放到result数组，没处理过则进行处理
var postorder2 = function (root) {
    if (!root) return []
    let result = [], stack = [{ node: root, isProcess: false }]
    while (stack.length) {
        let cur = stack.pop()
        if (cur.isProcess) {
            result.push(cur.node.val)
        } else {
            cur.isProcess = true
            if (cur.node.children) {
                stack.push(cur)
                for (let i = cur.node.children.length - 1; i >= 0; i--) {
                    stack.push({ node: cur.node.children[i], isProcess: false })
                }
            } else {
                result.push(cur.node.val)
            }
        }
    }
    return result
}

// 官方题解比较巧妙
var postorder2 = function (root) {
    
}
// @lc code=end

// let node1 = {val:1}
// let node2 = {val:2}
// let node3 = {val:3}
// let node4 = {val:4}
// let node5 = {val:5}
// let node6 = {val:6}
// node1.children = [node3, node2, node4]
// node3.children = [node5, node6]

// let re = postorder(node1)
// console.log(re)