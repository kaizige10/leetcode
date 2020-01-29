/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 思路2：双指针,若2个链表长度相同且相遇点也在同一个位置，
// 那么A的指针和B的指针会第一次遍历时相遇
// 若不同，那么A指针遍历结束后，让其指向headB，B指针同理。
// 如此一来，由于A+B的长度等于B+A的长度，因此指针A和B一定会在第二次遍历时相遇
var getIntersectionNode = function(headA, headB) {
    if (headA == null || headB == null) return null
    let pA = headA, pB = headB
    
    while (pA != pB) {
        pA = pA == null ? headB : pA.next
        pB = pB == null ? headA : pB.next
    }
    return pA;
}
// 思路1：使用哈希表存储需要A链表的节点，然后再遍历B链表，去哈希表查
// 时间O(m+n)，空间O(n)
// var getIntersectionNode1 = function(headA, headB) {
//     let setA = new Set()
//     let cur = headA
//     while(cur) {
//         setA.add(cur)
//         cur = cur.next
//     }
//     cur = headB
//     while(cur) {
//         if (setA.has(cur)) return cur
//         cur = cur.next
//     }
//     return null
// };
// @lc code=end

function ListNode(val) {
    this.val = val;
    this.next = null;
}
let a1 = new ListNode(2)
let a2 = new ListNode(6)
let a3 = new ListNode(4)
a1.next = a2
a2.next = a3
let b1 = new ListNode(1)
let b2 = new ListNode(5)
b1.next = b2
getIntersectionNode(a1, b1)

