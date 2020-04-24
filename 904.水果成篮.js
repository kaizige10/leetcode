/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function(tree) {
    if (tree.length <= 2) return tree.length
    const map = new Map()
    let max = 0, current = 0
    for (let i = 0, j = 0; j<tree.length; ) {
        // 类型小于2个或者map中有同类型的水果，塞到map
        if (map.has(tree[j]) || map.size < 2) {
            map.has(tree[j]) ? map.set(tree[j], map.get(tree[j]) + 1) : map.set(tree[j], 1);
            j++
            current++
            max = Math.max(max, current);
        } else {
            // 类型超过2个了，把窗口左边的水果干掉
            let count = map.get(tree[i])
            count > 1 ? map.set(tree[i], count - 1) : map.delete(tree[i])
            i++
            current--
        }
    }
    return max;
};
// @lc code=end

// console.log(totalFruit([3,3,3,1,2,1,1,2,3,3,4]))

