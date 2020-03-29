/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance1 = function(word1, word2) {

    // 用哈希表记录每一个中间状态的最小距离
    let dp = new Map()

    let res =  min(word1, word2, dp)
    // console.log(dp);
    return res
};

/**
 * 找到当前状态的最小距离
 * @param {string} cur 
 * @param {string} target 
 * @param {Map} dp 
 */
function min(cur, target, dp) {
    console.log('开始找:',cur, target);
    
    if (cur === target) return 0
    if (dp.has(cur)) return dp.get(cur)

    // 找到第一个不同的字符
    let i = 0
    while(cur.charAt(i) === target.charAt(i)) i++
    
    let distances = []
    // 如果当前i字符能在target的i后面找到，就可以尝试在i之前插入target的i字符
    if (target.lastIndexOf(cur.charAt(i)) > i) {
        console.log(`${i}插入:${target.charAt(i)}`)
        distances.push(min(target.charAt(i) + cur.substr(i), target.substr(i), dp))
    }
    // 如果target的i字符能在cur的i后面找到，那么可以尝试删除当前i字符
    if (cur.lastIndexOf(target.charAt(i)) > i) {
        console.log(`${i}删除:${cur.charAt(i)}`)
        distances.push(min(cur.substr(i+1), target.substr(i), dp))
    }
    // 尝试替换当前i为目标的i
    console.log(`${i}替换:${cur.charAt(i)} -> ${target.charAt(i)}`)
    distances.push(min(target.charAt(i) + cur.substr(i+1), target.substr(i), dp))

    // 找到最小的，+1
    let minDis = Math.min(...distances) + 1
    console.log(cur, target, "找到了:", minDis);
    // 塞到缓存的哈希表
    dp.set(cur+','+target, minDis)
    return minDis
}

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let len1 = word1.length, len2 = word2.length
    // 特殊情况处理
    if (len1 == 0 || len2 == 0) return Math.max(len1, len2);
    // 用dp保存从i到j的最短距离
    let dp = Array.from({ length: len1 + 1 }, (a, i) =>
        Array.from({ length: len2 + 1}, (b, j) => {
            if (i === 0) return j; //第一行初始化
            if (j === 0) return i; //第一列初始化
            return 0;
        })
    );
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            // 若相同则直接等于dp[i-1][j-1]
            if (word1.charAt(i-1) === word2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1]
            } else [
                dp[i][j] = Math.min(
                    // 删除
                    dp[i-1][j],
                    // 插入
                    dp[i][j-1],
                    // 替换
                    dp[i-1][j-1]
                ) + 1
            ]
        }
    }
    return dp[len1][len2]
};

// console.log(minDistance('horse', 'ros') === 3);
// console.log(minDistance('intention', 'execution') === 5);
// console.log(minDistance('sea', 'eat') === 2);
// console.log(minDistance("plasma","altruism") === 6);
// console.log(minDistance("prosperity", "properties") === 4);
// @lc code=end

