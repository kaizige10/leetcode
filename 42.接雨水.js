/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * 思路三：二分法找最大值
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let len = height.length
    if (len <= 2) return 0
    return part(height, 0, height.length - 1)
  }
  
  function part(height, l, r) {
    if (l===r || l===r-1) return 0;
    
    let [lindex, rindex] = findLeftRightMax(height, l, r)
    let rain = getRain(height, lindex, rindex)
    rain += part(height, l, lindex)
    rain += part(height, rindex, r)
    return rain
  }
  
  /**
   * 找到从from到to的最大的两个柱子
   */
  function findLeftRightMax(height, from, to) {
    let lmax = height[from], lindex = from;
    let rmax = height[to], rindex = to;
    let l = from, r = to
    while (l < r) {
      if (height[l] > lmax) {
        lindex = l
        lmax = height[l]
      }
      if (height[r] > rmax) {
        rindex = r
        rmax = height[r]
      }
      if (height[l] < height[r]) {
        l++
      } else {
        r--
      }
    }
    return [lindex, rindex]
  }
  
  function getRain(height, l, r) {
    if (l === r || l === r - 1) return 0;
    let top = height[l] > height[r] ? height[r] : height[l];
    let L = l + 1,
      R = r - 1, rain = 0;
    while (L <= R) {
      if (L < R) {
        height[L] < top && (rain += top - height[L])
        height[R] < top && (rain += top - height[R])
      }
      if (L===R && height[L] < top) rain += top - height[L]
      L++
      R--
    }
    return rain
  }
  
  /**
   * 思路二：优化暴力查找，缓存已经找过的最大值
   * @param {number[]} height
   * @return {number}
   */
  var trap2 = function(height) {
    let len = height.length
    if (len <= 2) return 0
    let leftmax = [0], rightmax = [len - 1];
    // 从左找当前最大值 从右找当前最大值
    let rmax = height[len - 1], rindex = len - 1
    let lmax = height[0], lindex = 0
    for (let i = 1; i < len; i++) {
        if (height[i] > lmax) {
          lindex = i;
          lmax = height[i];
        }
        leftmax[i] = lindex
        let j = len - i - 1;
        if (height[j] > rmax) {
          rindex = j;
          rmax = height[j];
        }
        rightmax[j] = rindex
    }
  
    let rain = 0
    for (let i = 1; i < len - 1; i++) {
        let lmax = leftmax[i]
        let rmax = rightmax[i]
        let top = height[lmax] < height[rmax] ? height[lmax] : height[rmax];
        if (top > height[i]) rain += top - height[i]
    }
    return rain;
  }
  
  /**
   * 思路一：暴力查找
   * @param {number[]} height
   * @return {number}
   */
  var trap1 = function(height) {
    let len = height.length
    if (len <= 2) return 0
    let rain = 0
    for (let i = 1; i < len - 1; i++) {
        let lmax = findMaxIndex(height, 0, i)
        let rmax = findMaxIndex(height, i, len - 1)
        let top = height[lmax] < height[rmax] ? height[lmax] : height[rmax];
        if (top > height[i]) rain += top - height[i]
    }
    return rain;
  };
  
  function findMaxIndex(arr, from, to) {
    let max = -Number.MAX_VALUE, index = from;
    for (let i = from; i <= to; i++) {
        if (max < arr[i]) {
          max = arr[i];
          index = i
        }
    }
    return index;
  }
  
  function getRain(height, l, r) {
    if (l === r || l === r - 1) return 0;
    let top = height[l] > height[r] ? height[r] : height[l];
    let L = l + 1,
      R = r - 1, rain = 0;
    while (L <= R) {
      if (L < R) {
        height[L] < top && (rain += top - height[L])
        height[R] < top && (rain += top - height[R])
      }
      if (L===R && height[L] < top) rain += top - height[L]
      L++
      R--
    }
    return rain
  }
  
  
  // test
  // console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]) === 6)
  // console.log(trap([4,2,3]) === 1)
  // console.log(trap([5,1,3,2,5]) === 9)
  // console.log(trap([8,2,8,9,0,1,7,7,9]) === 27)
// @lc code=end

// console.log(trap([4,2,3]) === 1)
// console.log(trap([5,4,1,2]) === 1);
// console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]) === 6);
// console.log(trap([5,5,1,7,1,1,5,2,7,6]) === 23);


