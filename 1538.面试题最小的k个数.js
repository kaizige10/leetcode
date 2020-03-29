/**
 * 将i转换为最小堆
 * @param {*} nums 
 * @param {*} i 
 * @param {*} n 
 */
function heapify(nums, i, n) {
    let left = i * 2 + 1
    let right = i * 2 + 2
    let maxIndex = i
    if (left < n && nums[left] < nums[maxIndex]) {
        maxIndex = left
    }
    if (right < n && nums[right] < nums[maxIndex]) {
        maxIndex = right
    }
    if (maxIndex !== i) {
        [nums[i], nums[maxIndex]] = [nums[maxIndex], nums[i]]
        heapify(nums, maxIndex, n)
    }
}

/**
 * 把二叉树构建成最小堆
 * @param {*} nums 
 */
function buildHeap(nums) {
    let i = (nums.length - 1) >> 1
    for (; i >= 0; i--) {
        heapify(nums, i, nums.length)
    }
}

/**
 * 获取arr中最小的前k个数
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    let res = []
    buildHeap(arr)
    for (let i = 0; i < k; i++) {
        res.push(arr[0])
        let last = arr.length - i - 1;
        [arr[0], arr[last]] = [arr[last], arr[0]]
        heapify(arr, 0, last)
    }
    return res
};

let nums = [5,9,8,10,3]
// heapify(nums, 0, nums.length)
// buildHeap(nums)

console.log(getLeastNumbers(nums, 3))