/**
 * 基数排序-从低位向高位排
 * 考虑负数-只考虑整数
 * 执行用时 :112 ms, 在所有 JavaScript 提交中击败了86.26%的用户
 * 内存消耗 :43.6 MB, 在所有 JavaScript 提交中击败了25.92%的用户
 * @param {Array} nums
 */
function radixSort(nums) {
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    // 如果最小值是负数，且绝对值更大，那么就用最小值的位数
    if (min < 0 && -1 * min > max) max = -1 * min
    // 最大数的位数，假设都是整数
    let maxRadix = Math.pow(10, String(max).length)

    let radixArr
    // 从十分位开始排序，一直排到最大位
    for (let radix = 1; radix < maxRadix; radix *= 10) {
        radixArr = Array.from({length: 20}, () => [])
        nums.forEach(num => {
            // 取出当前分位的数
            let cur =  Math.floor(num / radix) % 10
            // 放到基数数组
            if(num < 0 && cur === 0){// -0特殊处理
                radixArr[0].push(num)
            } else {// 大于0或者小于0
                radixArr[cur + 10].push(num)
            }
        })
        // 把基数数组中的数放回到nums
        let i = 0
        radixArr.forEach(arr => {
            arr.forEach(item => {
                nums[i++] = item
            })
        })
    }
    return nums
}

/**
 * 基数排序-从高位向低位排
 * 考虑负数-只考虑整数
 * 如果用来进行整数排序，那么结果是错误的
 * 这种方法可用于字典序，即字符串的排序
 * @param {Array} nums
 */
function radixSort2(nums) {
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    // 如果最小值是负数，且绝对值更大，那么就用最小值的位数
    if (min < 0 && -1 * min > max) max = -1 * min
    // 最大数的位数，假设都是整数
    let maxRadix = Math.pow(10, String(max).length - 1)

    let radixArr
    // 从最高位开始排序，一直排到最低位
    for (let radix = maxRadix; radix >= 1; radix /= 10) {
        radixArr = Array.from({length: 20}, () => [])
        nums.forEach(num => {
            // 取出当前分位的数
            let cur =  Math.floor(num / radix) % 10
            // 放到基数数组
            if(num < 0 && cur === 0){// -0特殊处理
                radixArr[0].push(num)
            } else {// 大于0或者小于0
                radixArr[cur + 10].push(num)
            }
        })
        // 把基数数组中的数放回到nums
        let i = 0
        radixArr.forEach(arr => {
            arr.forEach(item => {
                nums[i++] = item
            })
        })
    }
    return nums
}

console.log(radixSort([616, 53,542,3,63,14,214,154,-748]));
console.log(radixSort([3, -1]));
console.log(radixSort([-1,2,-8,-10]));


