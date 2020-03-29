/**
 * 维护堆
 * 将一个完全二叉数的第i个元素向下转换成最大堆
 * @param {Array} nums 二叉树数组
 * @param {number} i 当前要转换的节点
 * @param {number} n 数组的长度
 */
function heapify(nums, i, n) {
    let left = 2 * i + 1
    let right = 2 * i + 2

    // 找到当前节点、左子节点、右子节点的最大的那个
    let maxIndex = i
    if (left < n && nums[left] > nums[maxIndex]) {
        maxIndex = left
    }
    if (right < n && nums[right] > nums[maxIndex]) {
        maxIndex = right
    }
    // 如果左或右比当前大，那么交换当前节点和左节点（右节点）
    if (maxIndex !== i) {
        [nums[maxIndex], nums[i]] = [nums[i], nums[maxIndex]]
        // 然后继续向下进行转换
        heapify(nums, maxIndex, n)
    }
    return nums
}

/**
 * 构建堆
 * 将一个完全二叉树转换成最大堆
 * @param {Array} nums 
 */
function buildHeap(nums) {
    // 先找到最后一个非叶子节点（通过找最后一个叶子节点的父节点）
    let index = (nums.length - 1) >> 1
    for (; index >= 0; index--) {
        heapify(nums, index, nums.length)
    }
    return nums
}

/**
 * 堆排序
 * 180ms，击败50%
 * @param {Array} nums 
 */
function heapSort(nums) {
    // 先转成最大堆
    buildHeap(nums)
    // 然后把最大数依次放到最后面去
    let len = nums.length
    for (let i = 0; i < len; i++) {
        [nums[0], nums[len - i - 1]] = [nums[len - i -1], nums[0]]
        // 再把第一个元素进行最大堆的转换
        heapify(nums, 0, len - i - 1)
    }
    return nums
}

let nums = [5,9,8,10,3]
// console.log(heapify(nums, 0, nums.length))
// console.log(buildHeap(nums))
console.log(heapSort([2,8,3,7,1,5,4]));
