import java.util.HashSet;
import java.util.Set;

/*
 * @lc app=leetcode.cn id=141 lang=java
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
// public class ListNode {
//     int val;
//     ListNode next;

//     ListNode(int x) {
//         val = x;
//     }
// }
public class Solution {
    public boolean hasCycle1(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head;
        while(fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) {
                return true;
            }
        }
        return false;
    }
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode cur = head;
        HashSet<ListNode> set = new HashSet<>();
        while(cur != null) {
            if (set.contains(cur)) return true;
            set.add(cur);
        }
        return false;
    }
    // public static void main(String[] args) {
    //     Solution s = new Solution();
    //     ListNode n1 = new ListNode(3);
    //     boolean a = s.hasCycle(n1);
    //     System.out.println(a);
    // }
}
// @lc code=end

