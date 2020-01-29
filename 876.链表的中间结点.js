/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
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
 * @param {ListNode} head
 * @return {ListNode}
 */
// 我的思路类似于官方的快慢指针，只是通过当前链表的长度来控制慢指针的移动
var middleNode = function(head) {
    let len = 0
    let cur = head, middle = head
    while(cur) {
        cur = cur.next
        if (++len % 2 === 0) middle = middle.next
    }
    return middle
};
// @lc code=end

