/*
 * @lc app=leetcode.cn id=203 lang=java
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
// public class ListNode {
//     int val;
//     ListNode next;

//     ListNode(int x) {
//         val = x;
//     }
// }

class Solution {
    public ListNode removeElements(ListNode head, int val) {
        ListNode sentinel = new ListNode(0);
        sentinel.next = head;
        ListNode prev = sentinel, cur = head;
        while (cur != null) {
            if (cur.val == val) {
                prev.next = cur.next;
                cur.next = null;
            } else {
                prev = cur;
            }
            cur = prev.next;
        }
        return sentinel.next;
    }
}
// @lc code=end
