/*
 * @lc app=leetcode.cn id=1290 lang=javascript
 *
 * [1290] 二进制链表转整数
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
 * @return {number}
 */
// 思路4：parseInt取2进制(非正经解法)
var getDecimalValue = function(head) {
    let cur=head, valStr = ''
    while(cur) {
        valStr += cur.val + ''
        cur = cur.next
    }
    return parseInt(valStr, 2)
}
// // 思路3：一次迭代
// var getDecimalValue = function(head) {
//     let cur = head, value = 0
//     while(cur) {
//         value = value * 2 + cur.val
//         cur = cur.next
//     }
//     return value
// }
// // 思路2：递归法
// var getDecimalValue2 = function(head) {
//     return getValue(head).value
// }
// function getValue(head) {
//     if (head.next == null) return {n: 0, value: head.val}
//     let {n, value} =  getValue(head.next)
//     return {n: n+1, value: value + head.val * (2 ** (n+1))}
// }
// // 思路1：两次迭代。第一次找到链表的长度，第二次计算十进制的值
// var getDecimalValue1 = function(head) {
//     let cur = head, len = -1
//     while(cur) {
//         len++
//         cur=cur.next
//     }
//     let value = 0
//     cur = head
//     while(cur) {
//         value += cur.val * (2 ** len)
//         len--
//         cur=cur.next
//     }
//     return value
// };
// @lc code=end

