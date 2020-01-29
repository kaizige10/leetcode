/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
// 思路2：递归，每次递归时交换第一个节点和后面的节点，终止条件是子链只有1个或0个节点
// 遍历1次，时间复杂度O(n)，空间复杂度O(n)

// 思路1：使用a和b两个指针进行交换，再用prev指针保存前一个node
// 遍历一次，时间复杂度O(n)，空间复杂度O(1)
var swapPairs = function(head) {
    if (head==null || head.next==null) return head

    let sentinel = new ListNode(null), prev, a=sentinel
    sentinel.next = head
    do {
        // prev、a和b进行赋值
        prev = a
        a = a.next
        b = a.next
        // 交换a和b的位置
        a.next = b.next
        b.next = a
        prev.next = b
    } while(a.next && a.next.next)

    return sentinel.next
};
// @lc code=end

