/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 思路：迭代。
// 利用二叉搜索树的性质：左子树均小于根，右子树均大于根
// 那么比较p、q和cur的大小可以直接判断下一步应该去左子树还是右子树查找
var lowestCommonAncestor = function(root, p, q) {
    let cur = root
    while(cur) {
        // p和q在cur左右两侧，或者p就是cur，或者q就是cur
        if ((p.val < cur.val && q.val > cur.val) || (p.val > cur.val && q.val < cur.val) || p.val == cur.val || q.val == cur.val) return cur
        if (p.val < cur.val) {
            // p和q在左侧
            cur = cur.left
        } else {
            // p和q在右侧
            cur = cur.right
        }
    }
};
// @lc code=end

