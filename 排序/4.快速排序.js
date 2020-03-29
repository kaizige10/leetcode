/**
 * 快速排序-填坑法递归
 * 基准值选取第一个元素
 * 100ms 97%
 * @param {Array} nums 
 */
function quickSort(nums) {
    return partition(nums, 0, nums.length - 1)
}
function partition1(nums, L, R) {
    if (R - L <= 0) return nums
    // 保存最初的L和R
    let left = L, right = R
    // keyIndex就是坑位，设置为最左边的元素（即pivot），并且缓存坑的数值
    let keyIndex = L++, key = nums[keyIndex]
    while(L <= R) {
        // 从right指针开始找比key小的数
        while (nums[R] >= key) R--
        if (L <= R) {
            // R填到左边的坑
            nums[keyIndex] = nums[R]
            // 更新坑位
            keyIndex = R--
        } else {
            break
        }
        // 接着从left指针开始找比key大的数
        while (nums[L] <= key) L++
        if (L <= R) {
            // L填到右边的坑
            nums[keyIndex] = nums[L]
            // 更新坑位
            keyIndex = L++
        }
    }
    // L和R汇合了，把缓存的key填到最新的坑位
    nums[keyIndex] = key
    // 然后递归调用partition进行下一趟排序
    partition(nums, left, keyIndex - 1)
    partition(nums, keyIndex + 1, right)
    return nums
}

/**
 * 快速排序-双指针法递归
 * 100ms 97%
 * @param {Array} nums 
 */
function partition(nums, L, R) {
    if (R - L <= 0) return nums
    // 随机选取pivot
    let randomIndex = Math.floor(Math.random() * (R - L + 1)) + L;
    // 为了方便，把pivot交换到第一个
    [nums[L], nums[randomIndex]] = [nums[randomIndex], nums[L]]

    let pivot = left = L, right = R

    // left设置为基准值
    while(L < R) {
        // R从右向左，找到比基准值小的数
        while (nums[R] >= nums[pivot] && L < R) R--
        // L从左向右，找到比基准值大的数
        while (nums[L] <= nums[pivot] && L < R) L++
        if (L < R) {
            // 交换这两个数
            [nums[L], nums[R]] = [nums[R], nums[L]]
        }
    }
    // L和R汇合了，把基准值和左边数组的最后一个数交换
    // 如果基准值比所有值都小，那么不用交换
    if (R !== pivot) {
        [nums[pivot], nums[R]] = [nums[R], nums[pivot]]
    }
    // 然后递归调用partition
    partition(nums, left, R - 1)
    partition(nums, R + 1, right)
    return nums
}

/**
 * 快速排序-双指针法 迭代法
 * 待实现
 * @param {Array} nums 
 */
function quickSort2(nums, L, R) {

}
console.log(quickSort([3,-1]));
console.log(quickSort([5,2,3,1]))
console.log(quickSort([5,1,1,2,0,0]));