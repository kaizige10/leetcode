/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
// 2.快慢指针
var detectCycle = function(head) {
    if (head == null || head.next == null) return null
    let slow = head.next, fast = head.next.next
    // 阶段1，快指针每次走2，慢指针每次走1，相遇时找到环
    while(slow != fast) {
        if (fast == null || fast.next == null) return null
        slow = slow.next
        fast = fast.next.next
    }
    // 阶段2：指针1从head开始走，指针2从相遇点开始走，当他们相遇时，即为环的入口
    let p1 = head
    let p2 = fast
    while(p1 != p2) {
        p1 = p1.next
        p2 = p2.next
    }
    return p1
};

// 1.哈希表
var detectCycle1 = function(head) {
    const set = new Set()
    let cur = head
    while(cur) {
        if (set.has(cur)) return cur
        set.add(cur)
        cur = cur.next
    }
    return null
};
// @lc code=end

