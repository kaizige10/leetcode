/**
 * 原始希尔排序（二分增量）
 * 插入排序的改进版
 * 先分k组进行插入排序，然后再分k/2组排序，最后只分1组进行插入排序
 * 这样做的原因是可以减少比较和移动的操作
 * 增量为len/2, len/4, ... , 1
 * leetcode时间：100ms，超过97%
 * @param {Array} nums 
 */
function shellSort1(nums) {
  let len = nums.length
  if (len <= 1) return nums
  // 增量设为k
  let k = len
  while(k > 1) {
    // 增量每次除以2
    k = Math.ceil(k / 2)
    // 分成k组进行排序
    for (let i = 0; i < k; i++) {
      // 每一组从i开始，每一个元素是i，i+k，i+2k，i+3k，...，i + nk，现在开始简单插入排序
      for (let j = i + k; j < len; j += k) {
        // 前面的i到j已经排好序，因此从j - k开始从后往前遍历
        let insert = nums[j]
        for (let t = j - k; t >= i; t -= k) {
          if (nums[t] > insert) {
            // 当前数大于insert，则把当前数复制给下一个
            nums[t+k] = nums[t]
            // 当前t已经走到开头了，那么把insert插入到头
            if (t === i) {
              nums[t] = insert
            }
          } else {
            // 当前数不大于insert，说明找到应该插入的地方了，则把insert插入到t+k，然后退出
            nums[t+k] = insert
            break
          }
        }
      }
    }
  }
  return nums
}
/**
 * Hibbard增量希尔排序
 * 插入排序的改进版
 * 先分k组进行插入排序，然后再分k/2组排序，最后只分1组进3行插入排序
 * 这样做的原因是可以减少比较和移动的操作
 * 增量为2 ^ n - 1，即1,3,7,15
 * leetcode时间：164ms 超过51%
 * @param {Array} nums
 */
function shellSort(nums) {
  let len = nums.length
  if (len <= 1) return nums
  // 增量设为k
  let n = Math.floor(Math.log2(len + 1))
  let k = 2
  while(k > 1) {
    k = Math.pow(2, n--) - 1
    // 分成k组进行排序
    for (let i = 0; i < k; i++) {
      // 每一组从i开始，每一个元素是i，i+k，i+2k，i+3k，...，i + nk，现在开始简单插入排序
      for (let j = i + k; j < len; j += k) {
        // 前面的i到j已经排好序，因此从j - k开始从后往前遍历
        let insert = nums[j]
        for (let t = j - k; t >= i; t -= k) {
          if (nums[t] > insert) {
            // 当前数大于insert，则把当前数复制给下一个
            nums[t+k] = nums[t]
            // 当前t已经走到开头了，那么把insert插入到头
            if (t === i) {
              nums[t] = insert
            }
          } else {
            // 当前数不大于insert，说明找到应该插入的地方了，则把insert插入到t+k，然后退出
            nums[t+k] = insert
            break
          }
        }
      }
    }
  }
  return nums
}

const assert = require('assert')
assert.deepEqual(shellSort([5,2,1,3,4]), [1,2,3,4,5])
assert.deepEqual(shellSort([5,1,1,2,0,0]), [0,0,1,1,2,5])

console.log(shellSort([5,2,3,1]))