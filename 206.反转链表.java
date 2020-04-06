/*
 * @lc app=leetcode.cn id=206 lang=java
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
// public class ListNode {
//     int val;
//     ListNode next;

//     ListNode(int x) {
//         val = x;
//     }
// }
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null) return head;
        ListNode prev = null, cur = head;
        while(cur.next != null) {
            ListNode temp = cur.next;
            cur.next = prev;
            prev = cur;
            cur = temp;
        }
        cur.next = prev;
        return cur;
    }
}
// @lc code=end

