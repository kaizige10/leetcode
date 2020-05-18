
class KMP {
    /**
     * 
     * @param {string} pattern 模式串
     */
    constructor(pattern) {
        this.pat = pattern;
        let M = pattern.length;
        // 初始化二维数组
        this.dp = Array.from({length: M + 1}, () => Array.from({length: 256}, () => 0));
        // 边界。从状态0遇到第一个字符时，可以推进到状态1
        this.dp[0][this.pat.charCodeAt(0)] = 1;
        // 初始化影子状态X
        let X = 0;
        // 开始构造其他状态
        for (let j = 1; j < M; j++) {
            for (let c = 0; c < 256; c++) {

                
                if (c === this.pat.charCodeAt(j)) {
                    this.dp[j][c] = j + 1;
                } else {
                    this.dp[j][c] = this.dp[X][c];
                }
            }
            // 更新影子状态
            X = this.dp[X][this.pat.charCodeAt(j)];
        }
    }

    /**
     * 搜索
     * @param {string} str 待查找的字符串
     */
    search(str) {
        let M = this.pat.length;
        let N = str.length;
        for (let i = 0, j = 0; i < N; i++) {
            // 下面一段判断的逻辑没必要
            // if (str.charCodeAt(i) === this.pat.charCodeAt(j)) {
            //     // str和pat匹配，j向前推进
            //     j++;
            // } else {
            //     // 当前状态是j，要找字符str[i]，下一个状态是什么
            //     j = this.dp[j][str.charCodeAt(i)]
            // }

            // 当前状态是j，要找字符str[i]，下一个状态是什么
            j = this.dp[j][str.charCodeAt(i)]
            // j到达终止状态
            if (j === M) {
                return i - M + 1;
            }
        }
        return -1;
    }
}

let kmp = new KMP('ababc');
console.log(kmp.search('ababc'));
console.log(kmp.search('bbbbbbbababc'));

