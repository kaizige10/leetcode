
/**
 * 石头游戏
 * 你和你的朋友面前有一排石头堆，用一个数组 piles 表示，piles[i] 表示第 i 堆石子有多少个。你们轮流拿石头，一次拿一堆，但是只能拿走最左边或者最右边的石头堆。所有石头被拿完后，谁拥有的石头多，谁获胜。
 * 石头的堆数可以是任意正整数，石头的总数也可以是任意正整数，这样就能打破先手必胜的局面了。比如有三堆石头 piles = [1, 100, 3]，先手不管拿 1 还是 3，能够决定胜负的 100 都会被后手拿走，后手会获胜。
 * 假设两人都很聪明，请你设计一个算法，返回先手和后手的最后得分（石头总数）之差。比如上面那个例子，先手能获得 4 分，后手会获得 100 分，你的算法应该返回 -96。
 * @param {array} piles 
 */
function stoneGame(piles) {
    let len = piles.length
    // dp[i][j]表示对于石块堆i...j，先手和后手拿到的最多的石头数
    let dp = Array.from({ length: len }, () => Array.from({ length: len }, () => ({ first: 0, second: 0 })));

    for (let i = 0; i < len; i++) {
        dp[i][i] = { first: piles[i], second: 0 };
    }
    for (let t = 1; t < len; t++) {
        for (let i = 0, j = t; j < len; i++, j++) {
            let pickLeft = dp[i + 1][j].second + piles[i];
            let pickRight = dp[i][j - 1].second + piles[j];
            if (pickLeft > pickRight) {
                dp[i][j].first = pickLeft;
                dp[i][j].second = dp[i + 1][j].first;
            } else {
                dp[i][j].first = pickRight;
                dp[i][j].second = dp[i][j - 1].first;
            }
        }
    }
    // console.log(dp)
    return dp[0][len - 1];
}

console.log(stoneGame([3, 9, 1, 2]))