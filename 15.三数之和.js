/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * threeSum 思路是排序后，通过固定第一个数，双指针遍历找到所有解
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 先排序
    nums.sort((a,b)=>a-b)
    
    let result = []
    for (let i = 0; i < nums.length;) {
        // 特殊优化，nums[i] > 0，无解
        if (nums[i] > 0) break
        
        let left = i + 1, right = nums.length - 1
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            // 满足条件
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]])
                // 过滤掉相同的项目
                while(nums[left] === nums[++left]) {}
                while(nums[right] === nums[--right]) {}
            }
            // 不满足且小于0，较小者增大
            if (sum < 0) {
                left++
            }
            // 不满足且小于0，较大者减小
            if (sum > 0) {
                right--
            }
        }
        // 重复的num[i]跳过
        while(nums[i] === nums[++i]) {}
    }
    // console.log(result)
    return result
};

// @lc code=end

// threeSum([-1, 0, 1, 2, -1, -4])
// threeSum([0,0,0,0])
// threeSum([-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0])
// threeSum([7,-13,-1,1,-6,14,10,-2,1,9,11,-10,8,-10,14,13,-1,4,-6,-3,-5,3,3,12,-5,11,5,-6,-2,0,-6,12,3,0,-2,12,-1,-7,-5,8,10,13,13,3,10,12,-7,-6,-7,-5,-1,3,5,-13,-8,-15,13,13,-14,-12,-2,-5,-15,8,11,-1,6,-13,-1,8,10,-14,-1,0,-4,-6,-3,5,-4,-2,7,10,8,-3,12,-14,-10,3,14,-9,-2,-11,-6,-9,13,12,-3,4,14,3,-11,2,5,-5,-13,-14,-3,-8])

// var threeSum1 = function (nums) {
//     let results = []
//     for (let i = 0; i < nums.length; i++) {
//         let needMap = new Map()
//         for (let j = i + 1; j < nums.length; j++) {
//             const need = 0 - nums[i] - nums[j]
//             if (needMap.has(need)) {
//                 // 判断是否重复
//                 // console.log('找到一个：', [nums[i], nums[j], need]);
//                 if (!results.find(result => {
//                     return isSame(result, [nums[i], nums[j], need])
//                 })) {
//                     results.push([nums[i], nums[j], need])
//                 }
//             } else {
//                 needMap.set(nums[j], 1)
//             }

//         }
//     }
//     // console.log(results)
//     return results
// };

// function isSame(a1, a2) {
//     for (let i = 0; i < a1.length; i++) {
//         let j = a2.indexOf(a1[i])
//         if (j===-1) return false
//         a2.splice(j, 1)
//     }
//     return true
// }