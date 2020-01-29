/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}
 */
// 使用哨兵节点
var removeElements = function (head, val) {
    let sentinel = new ListNode(null)
    sentinel.next = head
    let prev = sentinel
    let cur = head
    while(cur) {
        if (cur.val === val) {
            let next = prev.next = cur.next
            cur.next = null
            cur = next
        } else {
            prev = cur
            cur = cur.next
        }
    }
    return sentinel.next
}

// 判断prev节点是否存在
var removeElements1 = function (head, val) {
    let cur = head
    let prev
    while (cur) {
        if (cur.val === val) {
            if (prev) {
                prev.next = cur.next
            } else {
                head = cur.next
            }
            let next = cur.next
            cur.next = null
            cur = next
        } else {
            prev = cur
            cur = cur.next
        }
    }
    return head
};
// @lc code=end

