/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder1 = function (root) {
    if (!root) return []
    let result = [root.val]
    if (root.children) {
        root.children.forEach(item => result.push(...preorder(item)))
    }
    return result
};

var preorder = function (root) {
    if (!root) return []
    let result = [], stack = [root]
    while (stack.length) {
        let cur = stack.pop()
        result.push(cur.val)
        if (cur.children) {
            for (let i = cur.children.length - 1; i >= 0; i--) {
                stack.push(cur.children[i])
            }
        }
    }
    return result
}
// @lc code=end

