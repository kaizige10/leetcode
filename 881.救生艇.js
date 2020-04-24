/*
 * @lc app=leetcode.cn id=881 lang=javascript
 *
 * [881] 救生艇
 */

// @lc code=start
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
    // 降序排序
    people.sort((a, b) => b - a)

    let count = 0
    for (let l = 0, r = people.length - 1; l <= r;) {
        if (people[l] + people[r] <= limit) {// 两个人可以拼
            l++
            r--
        } else {// 超重了，只能重的人坐船
            l++
        }
        count++
    }
    return count;
};
// @lc code=end

