/*
 * @lc app=leetcode.cn id=237 lang=javascript
 *
 * [237] 删除链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
// 这道题没有head节点，所以不能通过前面的节点来删除node节点
// 而node节点又一定不是最后一个节点，所以可以把node.next覆盖掉node节点，
// 然后node.next指向node.next的下一个节点即可
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};
// @lc code=end

