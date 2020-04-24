/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start

/**
 * 数组版本滑动窗口解法
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion1 = function(s1, s2) {
    if (s1.length > s2.length) return false;
  
    const arr2 = s2.split("");
    const arr1 = s1.split("");
    for (let i = 0, j = 0; j < arr2.length; ) {
      let index = arr1.indexOf(arr2[j]);
      if (index > -1) {
        // s1有这个字符，把arr1的删除
        arr1.splice(index, 1);
        if (arr1.length === 0) return true;
        j++;
      } else {
        // s1没有这个字符，把窗口左边+1，同时补充删除的i位置的字符
        if (i < j) {
          arr1.push(arr2[i++]);
        } else {
          i = j = j + 1;
        }
      }
    }
    return false;
  };
  
  /**
   * Map版本滑动窗口解法
   * 执行用时 :88 ms, 在所有 JavaScript 提交中击败了74.17%的用户
   * 内存消耗 :37.2 MB, 在所有 JavaScript 提交中击败了80.00%的用户
   * @param {string} s1
   * @param {string} s2
   * @return {boolean}
   */
  var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    // 构建s1字符串的map
    const map = new Map()
    for (const ch of s1) {
      map.has(ch) ? map.set(ch, map.get(ch) + 1) : map.set(ch, 1)
    }
    const arr2 = s2.split("");
    for (let i = 0, j = 0; j < arr2.length && i < arr2.length - s1.length + 1; ) {
      if (map.has(arr2[j])) {
        // s1有这个字符，把map的删除
        let count = map.get(arr2[j])
        count > 1 ? map.set(arr2[j], count - 1) : map.delete(arr2[j])
        if (map.size === 0) return true;
        j++;
      } else {
        // s1没有这个字符，把窗口左边+1，同时补充删除的i位置的字符
        if (i < j) {
          map.has(arr2[i]) ? map.set(arr2[i], map.get(arr2[i]) + 1) : map.set(arr2[i], 1)
          i++
        } else {
          i = j = j + 1;
        }
      }
    }
    return false;
  };
  
  console.log(checkInclusion("ab", "eidbaooo"));
  console.log(checkInclusion("ab", "eidboaoo"));
  console.log(checkInclusion("a", "ab"));
  console.log(checkInclusion("adc", "dcda"));
// @lc code=end

