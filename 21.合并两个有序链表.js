/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 思路2是递归法，每次递归时找到最小的那个作为头，然后剩下的继续进行递归
var mergeTwoLists = function (l1, l2) {
    if (l1 == null) {
        return l2
    } else if (l2 == null) {
        return l1
    } else if (l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}
// 思路1是迭代法，比较2个链表头部的节点值，小的那个合并到新链表。
//  结束时，如果一个链表为null，那么把剩下的链表接到当前的结尾即可。
var mergeTwoLists2 = function (l1, l2) {
    let sentinel = new ListNode(null), cur = sentinel
    while (l1 != null || l2 != null) {
        if (l1 == null) {
            cur.next = l2
            break
        }
        if (l2 == null) {
            cur.next = l1
            break
        }
        if (l1.val <= l2.val) {
            cur.next = l1
            cur = l1
            l1 = l1.next
        } else {
            cur.next = l2
            cur = l2
            l2 = l2.next
        }
    }
    return sentinel.next
};
// @lc code=end

// function ListNode(val) {
//     this.val = val;
//     this.next = null;
// }
// let l1 = new ListNode(-9)
// let l2 = new ListNode(3)
// // let l3 = new ListNode(4)
// l1.next = l2
// // l2.next = l3

// let p1 = new ListNode(5)
// let p2 = new ListNode(7)
// // let p3 = new ListNode(4)
// p1.next = p2
// // p2.next = p3

// mergeTwoLists(l1, p1)