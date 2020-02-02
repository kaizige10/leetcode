/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
// 思路：递归求子树是否是二叉搜索树
// 由于要所有子树的节点都小于或大于根节点，因此需要告诉子树根节点的值
// 所以把最大值和最小值直接传给辅助函数isSubValid
// 比较时除了和当前的root比较之外，还要和当前子树的最大最小值进行比较
var isValidBST = function(root) {
    if (!root) return true
    return isSubValid(root, -Number.MAX_VALUE, Number.MAX_VALUE)
};

/**
 * 子树是否为二叉搜索树
 * @param {*} root 子树的节点
 * @param {*} min 允许的最小值
 * @param {*} max 允许的最大值
 */
function isSubValid(root, min, max) {
    let res = true
    if (root.left) {
        // 比较当前的左子节点的值是否正确
        if (root.left.val >= root.val || root.left.val >= max || root.left.val <= min) return false
        // 递归比较左子树，左子树的最大值修改为当前根节点的值
        res = res && isSubValid(root.left, min, root.val)
    }
    if (root.right) {
        // 比较当前的右子节点的值是否正确
        if (root.right.val <= root.val || root.right.val <= min || root.right.val >= max) return false
        // 递归比较右子树，右子树的最小值修改为当前根节点的值
        res = res && isSubValid(root.right, root.val, max)
    }
    return res
}
// @lc code=end

// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// let root = new TreeNode(3)
// let node1 = new TreeNode(1)
// let node2 = new TreeNode(5)
// let node3 = new TreeNode(0)
// let node4 = new TreeNode(2)
// let node5 = new TreeNode(4)
// let node6 = new TreeNode(6)
// root.left = node1
// root.right = node2
// node1.left = node3
// node1.right = node4
// node2.left = node5
// node2.right = node6

// let res = isValidBST(root)
// console.log(res);