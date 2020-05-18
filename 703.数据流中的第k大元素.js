/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第K大元素
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.minHeap = [null];
    this.maxHeap = [null];
    for (let i = 0; i < nums.length; i++) {
        this.add(nums[i])
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    this.minHeap.push(val);
    this.minUp(this.minHeap.length - 1)
};

KthLargest.prototype.minUp = function(idx) {
    let parent = Math.floor(idx / 2);
    if (parent >= 1 && this.minHeap[parent] > this.minHeap[idx]) {
        swap(this.minHeap, parent, idx);
        this.minUp(parent);
    }
};
KthLargest.prototype.down = function(heap, idx) {
    let to = idx;
    let left = idx * 2;
    if (left < heap.length && heap[left]) {
        swap(heap, parent, idx);
        this.minUp(parent);
    }
};

function swap(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}
/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end

