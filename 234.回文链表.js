/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
// 思路3：链表元素入栈，然后出栈时和链表进行逐一比较

// 思路2：为了使空间复杂度为O(1)，可以把链表的前半部分翻转，然后再进行比较
// 比较结束后要还原链表，不对链表进行破坏

// 思路1：链表存到数组，然后用双指针
var isPalindrome = function (head) {
    if (head == null) return true
    let cur = head, arr = []
    while (cur) {
        arr.push(cur.val)
        cur = cur.next
    }
    let left = 0, right = arr.length - 1
    while (left < right) {
        if (arr[left++] != arr[right--]) return false
    }
    return true
};
// @lc code=end

