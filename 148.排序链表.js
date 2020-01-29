/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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
// 思路2：归并排序，把链表一层层地分解成长度为1小链表，进行排序，
// 排序完成后合并成长度为2的链表，然后再合并排序，依次类推。
// 分解的次数为log n
// 排序后的链表进行合并操作
// 由于排序后的链表合并操作时间复杂度只有O(n)，空间复杂度为O(1)，
// 因此总的时间为O(n*log n)
var sortList = function (head) {
    // 0个或者1个直接返回
    if (!head || !head.next) return head
    let n = 1, len = 1, cur = head.next, sentinel = new ListNode(null)
    sentinel.next = head
    while (cur) {
        // 第一次遍历找到链表长度
        len++
        cur = cur.next
    }
    while (n < len) {
        // 用prev记录每次合并时左边链表的前一个指针
        let prev = sentinel
        while (prev) {
            prev = mergeList(prev, n)
        }
        // 每次归并的子链表长度翻倍：1,2,4,8
        n *= 2
    }
    return sentinel.next
}

/**
 * 合并2个链表，输出是合并后链表的最后一个节点
 * @param {ListNode} sentinel 第一个链表的前一个节点
 * @param {number} n 链表长度
 */
function mergeList(sentinel, n) {
    let i = 0, cur = sentinel
    // 循环n次，找到p1链表的尾巴和p2链表的头
    while (i < n) {
        if (cur.next) {
            cur = cur.next
            i++
        } else {
            // 左边链表如果长度不足，那么无需合并，直接返回空
            return null
        }
    }
    let p1Tail = cur, p1 = sentinel.next, p2 = cur.next, prev = sentinel
    
    // 合并p1和p2
    // 此时用i记录p2移动的次数
    i = 0
    // p2移动次数最多为n
    while (p2 && i < n) {
        if (p1.val > p2.val) {
            // p1大于p2，把p2插入p1左侧
            p1Tail.next = p2.next
            prev.next = p2
            p2.next = p1
            // 插入结束把p2指向下一个
            if (++i == n) {
                // p2到底了，直接返回尾巴，即p1Tail
                return p1Tail
            } else {
                prev = p2
                p2 = p1Tail.next
            }
        } else {
            // p1小于等于p2
            if (p1 == p1Tail) {
                // p1到底了，说明p2以及后面的都比p1的大，那么直接退出循环
                break
            } else {
                // p1没到底
                if (p1.next.val <= p2.val) {
                    // 先判断左边的next是否小于等于右边，是的话p1前进一步
                    prev = p1
                    p1 = p1.next
                } else {
                    // 不是的话p2插入到p1的右侧
                    p1Tail.next = p2.next
                    p2.next = p1.next
                    p1.next = p2
                    if (++i == n) {
                        // p2到底了，直接退出
                        return p1Tail
                    } else {
                        // 插入完成，把p2指向下一个，p1也指向下一个
                        p1 = p2.next
                        prev = p2
                        p2 = p1Tail.next
                    }
                }
            }
        }
    }
    // p2移动次数少于n-1，那么就继续后移到末尾
    while (i < n - 1 && p2) {
        p2 = p2.next
        i++
    }
    return p2
}

// @lc code=end

// function ListNode(val) {
//     this.val = val;
//     this.next = null;
// }
// function arrToList(arr) {
//     let nodeList = arr.map(item => new ListNode(item))
//     for (let i = 0; i < nodeList.length; i++) {
//         const node = nodeList[i];
//         if (i+1<arr.length) {
//             node.next = nodeList[i+1]
//         }
//     }
//     return nodeList[0]
// }
// function listToArr(head, n) {
//     let cur = head,arr=[]
//     while(cur) {
//         arr.push(cur.val)
//         cur = cur.next
//         if (arr.length == n) {
//             console.log(arr)
//             arr.length = 0
//         }
//     }
//     console.log()
//     console.log()
// }
// // let arr = [99,135,42,150]
// let arr = [-84,142,41,-17,-71,170,186,183,-21,-76,76,10,29,81,112,-39,-6,-43,58,41,111,33,69,97,-38,82,-44,-7,99,135,42,150,149,-21,-30,164,153,92,180,-61,99,-81,147,109,34,98,14,178,105,5,43,46,40,-37,23,16,123,-53,34,192,-73,94,39,96,115,88,-31,-96,106,131,64,189,-91,-34,-56,-22,105,104,22,-31,-43,90,96,65,-85,184,85,90,118,152,-31,161,22,104,-85,160,120,-31,144,115]
// let head = arrToList(arr)
// let ans = sortList(head)




// let a1 = new ListNode(4)
// let a2 = new ListNode(3)
// let a3 = new ListNode(2)
// let a4 = new ListNode(1)
// // let a5 = new ListNode(0)
// a1.next = a2
// a2.next = a3
// a3.next = a4
// // a4.next = a5

// sortList(a1)

// // 思路1：由于链表的插入操作时间复杂度为O(1)，考虑插入排序，
// // 每次将未排序的节点插入到已排序的链表，（每次都要遍历，速度比较慢）
// // 时间复杂度O(n^2)，空间复杂度O(1)
// var sortList1 = function (head) {
//     // 0个或者1个直接返回
//     if (!head || !head.next) return head

//     let sortedLast = head, unsorted = head.next, sentinel = new ListNode(null)
//     sentinel.next = head
//     while (unsorted) {
//         let cur = sentinel.next, prev = sentinel
//         do {
//             if (cur.val <= unsorted.val) {
//                 // unsorted大于等于cur，那么继续遍历
//                 if (cur.next == unsorted) {
//                     sortedLast = unsorted
//                     unsorted = unsorted.next
//                     break
//                 }
//                 prev = cur
//                 cur = cur.next
//             } else {
//                 // unsorted小于cur，那么把unsorted插入cur之前
//                 sortedLast.next = unsorted.next
//                 prev.next = unsorted
//                 unsorted.next = cur
//                 // 然后修改unsorted指向，跳出循环
//                 unsorted = sortedLast.next
//                 break
//             }
//         } while (cur != unsorted)

//     }
//     return sentinel.next
// };