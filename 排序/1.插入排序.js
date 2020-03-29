/**
 * 插入排序1
 * 1532ms
 * @param {Array} nums 
 */
function insertSort1(nums) {
    let len = nums.length
    if (len <= 1) return nums

    for (let i = 1; i < len; i++) {
        let insert = nums[i]
        for (let j = 0; j < i; j++) {
            // 从前向后找到比insert大的j，然后进行数组数值的拷贝
            // 这里可以进行二分查找的优化
            if (nums[j] > insert) {
                for (let k = i - 1; k >= j; k--) {
                    nums[k+1] = nums[k]
                }
                nums[j] = insert
                break
            }
        }
    }
    return nums
}

/**
 * 插入排序
 * leetcode: 1120ms
 * @param {Array} nums 
 */
function insertSort(nums) {
    let len = nums.length
    // 从1开始排序，认为前面的0已经排好序了
    for (let i = 1; i < len; i++) {
        // 保存当前要插入到有序数组的数
        let insert = nums[i]
        for (let j = i - 1; j >= 0; j--) {
            // 有序数组中从后往前找比insert大的数，找到了就把当前的数复制到下一个
            if (nums[j] > insert) {
                nums[j+1] = nums[j]
                // 如果一直找到第一个，直接插入
                if (j === 0) nums[j] = insert
            } 
            // 找不到就把insert插入进去
            else {
                nums[j+1] = insert
                break
            }
        }
    }
    return nums
}

const assert = require('assert')
assert.deepEqual(insertSort([5,2,1,3,4]), [1,2,3,4,5])
assert.deepEqual(insertSort([5,1,1,2,0,0]), [0,0,1,1,2,5])

console.log(insertSort([5,2,3,1]))