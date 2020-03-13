/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 思路一：每次求解当前amount时，找所有coin里面的减去coin面值后的f[remainAmount]最小值
var coinChange2 = function (coins, amount) {
    if (amount === 0) return 0
    if (coins.includes(amount)) return 1
    let f = Array.from({ length: amount + 1 }, () => -1)
    for (let i = 0; i < amount + 1; i++) {
        let min = Number.MAX_VALUE
        for (let j = 0;j<coins.length; j++) {
            let remainAmount = i - coins[j]
            // 当前值正好等于硬币的大小
            if (remainAmount === 0) {
                min = 1
                break
            } else if (remainAmount > 0) {
                if (f[remainAmount] != -1 && min > f[remainAmount]) {
                    min = f[remainAmount] + 1
                }
            }
        }
        if (min !== Number.MAX_VALUE) f[i] = min
    }
    return f[amount]
};
// 思路2：每次求解当前amount时，和coin里面的减去coin面值后的f[remainAmount]，对比用更小的那个设置f[i]
var coinChange = function (coins, amount) {
    if (amount === 0) return 0
    if (coins.includes(amount)) return 1
    // f数组初始化成amount + 1，这样每次对比时就可以找到最小值
    let f = Array.from({ length: amount + 1 }, () => amount + 1)
    for (let i = 0; i < amount + 1; i++) {
        for (let j = 0;j<coins.length; j++) {
            let remainAmount = i - coins[j]
            if (remainAmount > 0) {
                f[i] = f[i] < f[remainAmount] + 1 ? f[i] : f[remainAmount] + 1
            } else if (remainAmount===0){
                f[i] = 1
            }
        }
    }
    return f[amount] > amount ? -1 : f[amount]
}
// @lc code=end
// console.log(coinChange([1,2,5], 11))
// console.log(coinChange([1,2,5], 12))
// console.log(coinChange([1,2,5], 13))
// console.log(coinChange([2,5,7], 1))
// console.log(coinChange([2,5,7], 2))
// console.log(coinChange([2,5,7], 3))
// console.log(coinChange([2,5,7], 4))
// console.log(coinChange([2,5,7], 5))
// console.log(coinChange([2,5,7], 6))
// console.log(coinChange([2,5,7], 7))
// console.log(coinChange([2,5,7], 8))
// console.log(coinChange([2,5,7], 9))
// console.log(coinChange([2,5,7], 10))
// console.log(coinChange([2,5,7], 11))
// console.log(coinChange([2,5,7], 12))
// console.log(coinChange([2,5,7], 13))
// console.log(coinChange([2,5,7], 14))
// console.log(coinChange([2,5,7], 15))
// console.log(coinChange([2,5,7], 16))
// console.log(coinChange([2,5,7], 17))
// console.log(coinChange([2,5,7], 18))
// console.log(coinChange([2,5,7], 19))
