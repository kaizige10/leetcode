/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
// var reverseList1 = function (head) {
//     if (head == null) return head
//     let sentinel = new ListNode(null)
//     sentinel.next = head
//     let prev = sentinel
//     let cur = head
//     while (cur) {
//         let next = cur.next
//         cur.next = prev
//         prev = cur
//         cur = next
//     }
//     head.next = null
//     return prev
// };

var reverseList = function (head) {
    let prev = null, cur = head
    while (cur) {
        // 使用解构赋值来减少代码
        [cur.next, prev, cur] = [prev, cur, cur.next]
        // let next = cur.next
        // cur.next = prev
        // prev = cur
        // cur = next
    }
    return prev
}
// @lc code=end

// function ListNode(val) {
//     this.val = val;
//     this.next = null;
// }

// let n1 = new ListNode(1)
// let n2 = new ListNode(2)
// let n3 = new ListNode(3)
// n1.next = n2
// n2.next = n3

// let newHead = reverseList(n1)
// let cur = newHead
// while(cur) {
//     console.log(cur.val)
//     cur = cur.next
// }