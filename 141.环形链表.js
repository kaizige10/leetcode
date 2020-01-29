/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
// 使用快慢指针判断环的存在
var hasCycle = function(head) {
    if (head == null || head.next == null) return false
    
    let slow = head, fast = head.next
    while (slow != fast) {
        if (fast == null || fast.next == null) return false
        slow = slow.next
        fast = fast.next.next
    }
    return true
}

// @lc code=end
// 使用哈希表存储
var hasCycle_1 = function(head) {
    let map = new Map()
    let cur = head
    while(cur && !map.has(cur)) {
        map.set(cur, 0)
        cur = cur.next
    }
    return cur != null
};