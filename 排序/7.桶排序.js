
/**
 * 桶排序
 * 桶的数量初始化为总数的十分之一
 * 执行用时 :112 ms, 在所有 JavaScript 提交中击败了86.26%的用户
 * 内存消耗 :44.3 MB, 在所有 JavaScript 提交中击败了23.14%的用户
 * @param {Array} nums
 */
function bucketSort1(nums) {
    console.log('nums: [', nums.join(', '), ']')
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    console.log(`最小${min}, 最大${max}`);
    
    let len = nums.length
    // 桶的数量初始化为总数的十分之一
    let bucketLen = Math.ceil(len / 10)
    console.log('桶的数量 ', bucketLen);
    
    // 每个桶的范围
    let bucketRange = (max - min) / bucketLen
    console.log('桶的范围 ', bucketRange);
    // 特殊处理，如果值都一样，就不用排序
    if (bucketRange === 0) return nums
    // 创建一个范围是min到max的bucket数组，初始化为空数组，多出的1个桶放最后一个元素
    let buckets = Array.from({ length: bucketLen + 1 }, () => [])
    // 把nums中的元素放到桶中
    nums.forEach(item => {
        let index = Math.floor((item - min) / bucketRange)
        buckets[index].push(item)
    })
    buckets.forEach((item, index) => {
        console.log(`${index}号桶，范围：${min + index * bucketRange} - ${min + (index+1) * bucketRange}，[ ${item.join(', ')} ]`);
    })
    
    // 对每个桶中的数组进行排序，然后输出结果
    let index = 0
    buckets.forEach(bucket => {
        if (bucket.length > 0) {
            // 用js的sort进行排序，可以近似看做快速排序
            bucket.sort((a, b) => a-b)
            bucket.forEach(item => {
                nums[index++] = item
            })
        }
    })
    buckets.forEach((item, index) => {
        console.log(`${index}号桶，范围：${min + index * bucketRange} - ${min + (index+1) * bucketRange}，[ ${item.join(', ')} ]`);
    })
    console.log(nums.join(', '));
    
    return nums
}
// let nums = Array.from({length: 50}, () => {
//     return parseFloat((Math.random() * 100).toFixed(1))
// })
let nums = [ 52.4, 11.2, 29.6, 44.3, 13.9, 57.2, 31.8, 72.4, 59.6, 31.1, 10.4, 16.8, 50, 9, 92.9, 39.9, 86.7, 
    29.8, 41.2, 53.3, 70.4, 19.8, 2.9, 52.4, 87.3, 97.9, 34.5, 4.5, 13.6, 8.8, 54.5, 84.5, 83, 17.1, 45, 12.9, 
    57.1, 58.5, 30.3, 88.5, 63.4, 70.5, 96.2, 50.4, 38.9, 51.5, 74.9, 92.3, 64.2, 79 ];
bucketSort1(nums)

/**
 * 桶排序
 * 桶的数量初始化为nums的长度
 * 执行用时 :140 ms, 在所有 JavaScript 提交中击败了64.47%的用户
 * 内存消耗 :61.3 MB, 在所有 JavaScript 提交中击败了5.09%的用户
 * @param {Array} nums
 */
function bucketSort(nums) {
    // 先找到最大和最小值
    let max = -Number.MAX_VALUE;
    let min = +Number.MAX_VALUE;
    nums.forEach((item, i) => {
        min > item && (min = item);
        max < item && (max = item);
    });
    let len = nums.length
    // 桶的数量初始化为总数的十分之一
    let bucketLen = len
    // 每个桶的范围
    let bucketRange = (max - min) / bucketLen
    // 特殊处理，如果值都一样，就不用排序
    if (bucketRange === 0) return nums
    // 创建一个范围是min到max的bucket数组，初始化为空数组，多出的1个桶放最后一个元素
    let buckets = Array.from({ length: bucketLen + 1 }, () => [])
    // 把nums中的元素放到桶中
    nums.forEach(item => {
        let index = Math.floor((item - min) / bucketRange)
        buckets[index].push(item)
    })
    // 对每个桶中的数组进行排序，然后输出结果
    let index = 0
    buckets.forEach(bucket => {
        if (bucket.length > 0) {
            // 用js的sort进行排序，可以近似看做快速排序
            bucket.sort((a, b) => a-b)
            bucket.forEach(item => {
                nums[index++] = item
            })
        }
    })
    return nums
}
// console.log(bucketSort([0]));
// console.log(bucketSort([3, -1]));
// console.log(bucketSort([5, 2, 3, 1]));
// console.log(bucketSort([5, 1, 1, 2, 0, 0]));
// console.log(bucketSort([5, 1, 1, 2, 0, 4, 12, 23, 7, 19, 11, 3, 28]));

//桶排序我设置了桶的数量为2种，一种是与nums数量相同，一种是nums数量的十分之一；
// 前者是为了让每个桶中尽量只有1个元素，减少桶内排序时比较的次数，来发挥桶排序的优势，
// 后者是为了减少桶的数量，并且假设每个桶中元素数量大概为10个，
// 而10个以内的元素的排序是很快的（js的sort底层当元素数量少于10个时用插入排序）