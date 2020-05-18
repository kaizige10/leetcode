// https://labuladong.gitbook.io/algo/dong-tai-gui-hua-xi-lie/dong-tai-gui-hua-zhi-si-jian-jian-pan
function maxA(N) {
    function dp(n, count, buffer) {
        let key = n + "," + count + "," + buffer;
        if (memo.has(key)) return memo.get(key);
        if (n === 0) return 0;
        if (n === 1) return buffer > 1 ? buffer : 1;

        // 打印一个A
        // 如果缓冲区数量大于1，那么没必要选择case1，所以改成0
        let case1 = buffer > 1 ? 0 : dp(n - 1, count + 1, buffer) + 1;
        // 全选+复制
        // 如果缓冲区等于当前字符数，说明刚刚才进行了全选+复制，就不需要再复制了
        let case23 = buffer === count ? 0 : dp(n - 2, count, count);
        // 粘贴
        // 如果缓冲区为0，那么没必要粘贴
        let case4 = buffer === 0 ? 0 : dp(n - 1, count + buffer, buffer) + buffer;
        let max = Math.max(case1, case23, case4);
        memo.set(key, max);
        return max;
    }

    let memo = new Map();
    return dp(N, 0, 0);
}

console.log(maxA(60))