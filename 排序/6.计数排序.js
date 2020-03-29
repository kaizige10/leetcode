/**
 * 计数排序
 * 104ms，击败94%
 * 40.5MB，击败82%
 * @param {Array} nums
 */
function countSort1(nums) {
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    // 创建一个范围是min到max的bucket数组，初始化为0
    let bucket = Array.from({ length: max - min + 1 }, () => 0);
    // 遍历一遍数组，对bucket进行赋值
    nums.forEach(item => bucket[item - min]++);
    // 遍历一遍bucket数组，把里面的数输出到nums
    let numsIndex = 0;
    bucket.forEach((item, index) => {
        if (item > 0) {
            let value = index + min;
            for (let i = 0; i < item; i++) {
                nums[numsIndex++] = value;
            }
        }
    });
    return nums;
}
/**
 * 稳定版计数排序
 * @param {Array} nums
 */
function countSort(nums) {
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    // 创建一个范围是min到max的counts数组，初始化为0
    let counts = Array.from({ length: max - min + 1 }, () => 0);
    // 遍历一遍数组，对bucket进行赋值
    nums.forEach(item => counts[item - min]++);
    // 处理counts，把它变成一个递增的数组
    let last = counts[0];
    for (let i = 1; i < counts.length; i++) {
        counts[i] += last;
        last = counts[i];
    }
    // 遍历一遍nums数组，找到每个元素对应的位置，放到新数组
    let sortedNums = Array.from({ length: nums.length }, () => 0);
    // 从后向前遍历nums,保证相同元素的顺序
    for (let i = nums.length - 1; i >= 0; i--) {
        let item = nums[i]
        // 根据当前值去counts中找当前值应该排在哪一位，注意要减一
        let index = counts[item - min] - 1
        // 放置时要把bucket本身的值减一，这样下次再找到这里，就可以排到前面去
        counts[item - min]--
        sortedNums[index] = item;
    }
    return sortedNums;
}
// - 计数排序速度很快，但是局限性很明显，空间浪费严重，而且只能对整数进行排序
// - 第一种是最简单的计数排序，没有考虑稳定性，是非稳定排序。
// 第二种是稳定的，原理是：bucket数组存储的是一个递增的index，这样在后面遍历nums时，
// 如果有2个相同的数，先遍历的数就会被放到后面去，从而实现了稳定得排序。