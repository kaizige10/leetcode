// 题目：给定一组正数，返回能否在其中找到一些和为特定数的数
// 如3,34,4,12,5,2中，可以找到4和5的和为9，因此返回true

// 思路1：递归
// 公式：pick(index, target) = pick(index - 1, target) || pick(index - 1, target - nums[index])
// 即对于当前index有2种情况，选择和不选择。
// 选择时应该将target减去当前数，然后继续找index-1；
// 不选择时target不变，继续找index-1
// 然后递归得找到答案
// 递归得出口在代码中可以找到
function combinationSum1(nums, target, index) {
    if (index == null) index =  nums.length - 1
    // 当前值正好等于target，找到了
    if (nums[index] === target) return true
    // 到了最后一位也没找到
    if (index === 0) return false
    // target小于0，肯定找不到
    if (target < 0) return  false
    return combinationSum(nums, target - nums[index], index - 1) || combinationSum(nums, target, index - 1)
}

// 思路2：循环法
// 循环就是从最小问题向上求最佳解的过程
// 定义一个二维数组chs保存所有结果，chs[k][t]表示前k个数字能否凑成t
// 最小问题就是第0个数能否凑成target，我们把第0个数的所有情况组成一个数组，chs[0][ nums[0] ]为true，其他都为false，因为只有nums[0]才能凑成自己
// 循环时每次去找一个数的所有解，即chs[k]的所有解
// 循环结束后取数组的最后一个值就是解
function combinationSum(nums, target) {
    // chs数组的含义：chs[k][t]表示前k个数字能否找到和为t
    // 用false填充chs，共有nums.length行，有target+1列，这个数组用来保存第chs(k, target)个的解（true或false）
    let chs = Array.from({length: nums.length}, () => Array.from({length: target + 1}, () => false))
    // 先考虑第一个数字
    if (nums[0] <= target) chs[0][nums[0]] = true
    // 第一列的结果都为true
    for (let row = 1;row<nums.length;row++) chs[row][0] = true
    for (let k = 1; k < nums.length; k++) {
        for (let t = 1; t < target + 1; t++) {
            if (t < nums[k]) {
                chs[k][t] = chs[k - 1][t]
            } else if(t === nums[k]) {
                chs[k][t] = true
            } else {
                chs[k][t] = chs[k - 1][t] || chs[k - 1][t - nums[k]]
            }
        }
    }
    return chs[nums.length - 1][target]
}

// test
console.log(combinationSum([3, 34, 4, 12, 5, 2], 9) === true)
console.log(combinationSum([3, 34, 4, 12, 5, 2], 10) === true)
console.log(combinationSum([3, 34, 4, 12, 5, 2], 11) === true)
console.log(combinationSum([3, 34, 4, 12, 5, 2], 12) === true)
console.log(combinationSum([3, 34, 4, 12, 5, 2], 13) === false)
console.log(combinationSum([2,3,5], 8) === true)
console.log(combinationSum([2,3,5], 9) === false)