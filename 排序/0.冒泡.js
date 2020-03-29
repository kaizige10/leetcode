/**
 * 简单版本冒泡
 * @param {Array} nums 
 * leetcode时间：6132ms
 */
function bubbleSort1(nums) {
    let len = nums.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (nums[j] > nums[j+1]) {
                [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
            }
        }
    }
    return nums
}

/**
 * 优化版本冒泡
 * 如果一轮排序下来，没有发生交换，则认为排序已经完成
 * leetcode时间：7168ms
 * @param {Array} nums 
 */
function bubbleSort(nums) {
    let len = nums.length
    let isSorted = true
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (nums[j] > nums[j+1]) {
                [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
                isSorted = false
            }
        }
        if (isSorted) return nums
        isSorted = true
    }
    return nums
}

const assert = require('assert')
assert.deepEqual(bubbleSort([5,2,1,3,4]), [1,2,3,4,5])
assert.deepEqual(bubbleSort([5,1,1,2,0,0]), [0,0,1,1,2,5])