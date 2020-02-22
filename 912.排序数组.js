/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 快排：简单版本，空间复杂度O(n)，时间复杂度平均O(nlogn)
// 分组思路就是for循环对比，把比select小的数放到left数组，比select大的数放到right数组
// 然后递归执行分组完成所有的排序
// 执行用时140ms，内存消耗55.5MB，击败了5%的人，哈哈哈
var sortArray1 = function (nums) {
    if (!nums || nums.length <= 1) return nums;
    let select = nums[0], leftArr = [], rightArr = []
    for (let i = 1; i < nums.length; i++) {
        select < nums[i] ? rightArr.push(nums[i]) : leftArr.push(nums[i]);
    }
    return sortArray(leftArr).concat(select, ...sortArray(rightArr));
};

// 快排，原地排序，空间复杂度O(1)
// 这个思路比较笨，就是在进行分组时，如果select比当前值大，
// 我是把select和后面的几个元素一步一步后移来实现的，
// 导致时间复杂度变高了，因此最后的结果是执行用时716ms，击败了36.79%的人；
// 内容消耗40.5MB，击败了73.5%的人
var sortArray2 = function (nums, l = 0, r = nums.length - 1) {
    if (!nums || nums.length <= 1 || l >= r) return nums
    let select = l, cur = l + 1
    while (cur <= r) {
        // 将第一个元素和后面的一一对比，小的移到前面来
        if (nums[cur] < nums[select]) {
            // 把cur前面的数后移
            const curVal = nums[cur]
            for (let i = cur; i > select; i--) {
                nums[i] = nums[i - 1]
            }
            nums[select] = curVal
            select++
        }
        cur++
    }
    // 递归地排序左边的数组
    sortArray(nums, l, select - 1)
    // 递归排序右边数组
    sortArray(nums, select + 1, r)
    return nums
}
// 快速排序 思路3：双指针交换法。空间复杂度O(1)
// 既然要进行左右分组，而且不占用额外空间，那就每次进行交换
// 设立左右两个指针，分别从头和尾向中间遍历
// 如果右指针的元素小于select，则交换到左边；如果左指针的元素大于select，则交换到右边
// 当俩指针相遇时，分组自然完成了
// 时间116 ms，击败79.43%。空间40.7MB击败67.42%
var sortArray = function (nums, l = 0, r = nums.length - 1) {
    if (!nums || nums.length <= 1 || l >= r) return nums
    let selectVal = nums[l], left = l, right = r
    while(l < r) {
        // 先从右指针遍历，每找到一个小的后丢到左边
        while(l < r) {
            if (nums[r] < selectVal) {
                nums[l] = nums[r]
                break
            }
            r--
        }
        // 再遍历左指针，每找到一个大的丢到右边
        while(l < r) {
            if (nums[l] > selectVal) {
                nums[r] = nums[l]
                break
            }
            l++
        }
    }
    // 最后把select放到中间
    nums[l] = selectVal
    sortArray(nums, left, l - 1)
    sortArray(nums, l + 1, right)
    return nums
}
// @lc code=end
// 测试
// let re = sortArray([5, 1, 4, 3, 6, 2, 0])
// console.log(re)