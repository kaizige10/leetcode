/**
 * 选择排序
 * 就是每次遍历，找到最大值，然后和数组尾巴进行交换。下一次遍历就不用遍历最后一个元素了
 * 1528ms
 * @param {Array} nums 
 */
function selectionSort(nums) {
    let len = nums.length
    if (len <= 1) return nums

    for (let i = len - 1; i >= 0; i--) {
        let max = -Number.MAX_VALUE, index = 0
        let j = 0
        for (; j < i + 1; j++) {
            if (max < nums[j]) {
                max = nums[j]
                index = j
            }
        }
        index !== --j && ([nums[index], nums[j]] = [nums[j], nums[index]]) 
    }
    return nums
}

const assert = require('assert')
assert.deepEqual(selectionSort([5,2,1,3,4]), [1,2,3,4,5])
assert.deepEqual(selectionSort([5,1,1,2,0,0]), [0,0,1,1,2,5])

console.log(selectionSort([5,2,3,1]))