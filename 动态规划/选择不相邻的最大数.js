// 题目：给定一组数，请找出其中不相邻的一些数，使他们的值最大

// 解法一：递归求最大值
// 递归公式：OPT(i) = max(OPT(i-2) + nums[i], OPT(i-1))
// 即第i个的最大解，可以有2种情况，一种是选择第i个数，加上i-2个的最大解，
// 还有一种是不选择第i个数，那么最大解就是i-1个数的最大解
// 比较这两种情况的最大值即可
function pickMax1(nums, index) {
    if (index == null) index = nums.length - 1
    // 出口1：只有1个数，就是他本身
    if (index === 0) return nums[0]
    // 出口2：有2个数，最大解就是0和1中较大的那个
    if (index === 1) return Math.max(nums[0], nums[1])
    return Math.max(pickMax(nums, index - 2) + nums[index], pickMax(nums, index - 1))
}

// 解法二：循环求最大值（空间换时间）
// 公式还是一样：OPT(i) = max(OPT(i-2) + nums[i], OPT(i-1))
// 用一个opt数组来保存从0,1,2...n的最大解，每次循环都能求得当前i的最大解
// 遍历一次即可得最大解
function pickMax(nums) {
    const opt = [nums[0], Math.max(nums[0], nums[1])]
    for(let i = 2;i<nums.length;i++) {
        opt[i] = Math.max(opt[i-2] + nums[i], opt[i-1])
    }
    return opt[nums.length - 1]
}
// test
console.log(pickMax([4,1,1,9,1]) === 13)
console.log(pickMax([1,2,4,1,7,8,3]) === 15)