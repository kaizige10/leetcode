/*
 * @lc app=leetcode.cn id=179 lang=javascript
 *
 * [179] 最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
// 思路1：把所有数分成10组，每组以0,1,2,3...9开头
// 然后在组内进行排序，可以得到最大数的放前面
// 最后再把所有数组的数连接起来，先连接9开头的，再连接8，以此类推
var largestNumber1 = function(nums) {
    // 拆成以0,1,2...9开头的数组
    let arrs = Array.from({length: 10}, ()=>[])
    nums.forEach(item => {
        let strNum = String(item)
        arrs[strNum.charAt(0)].push(strNum)
    })
    // 每组进行排序
    // 若a + b > b + a则说明a在前面更大
    arrs.forEach(arr => arr.sort((a, b) => {
        return a + b > b + a ? -1 : 1
    }))
    // 倒序进行字符串拼接
    let result = ''
    for(let i = arrs.length -1; i>=0; i--) {
        result += arrs[i].join('')
    }
    return Number(result) === 0 ? '0' : result
};
// 思路2：直接对所有数进行排序
// 排序后9开头的数字一定会排到前面去
var largestNumber = function(nums) {
    // 转成字符串
    let strNums = nums.map(item => String(item))
    // 排序
    // 若a + b > b + a则说明a在前面更大
    strNums.sort((a, b) => {
        return a + b > b + a ? -1 : 1
    })
    // 字符串拼接
    let result = strNums.join('')
    return Number(result) === 0 ? '0' : result
};
// @lc code=end

// test
// let re = largestNumber([3,30,34,5,9])
// console.log(re)