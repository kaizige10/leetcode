/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let codeMap = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        '6': 'F',
        '7': 'G',
        '8': 'H',
        '9': 'I',
        '10': 'J',
        '11': 'K',
        '12': 'L',
        '13': 'M',
        '14': 'N',
        '15': 'O',
        '16': 'P',
        '17': 'Q',
        '18': 'R',
        '19': 'S',
        '20': 'T',
        '21': 'U',
        '22': 'V',
        '23': 'W',
        '24': 'X',
        '25': 'Y',
        '26': 'Z'
    };
    let str = s.split(/10|20/).join("");
    if (str==='') return 1
    if (str.charAt(0) === '0') return 0

    let len = str.length
    // dp记录前i个的编码方法数量，t记录前i个编码数量中最后一个字符是单个的数量
    let dp, t
    t = dp = 1;
    for (let i = 1; i < len; i++) {
        let doubleStr = str.substr(i-1, 2)
        if (codeMap[doubleStr]) {
            // 可以组2个字符
            [t, dp] = [dp, dp + t]
        } else if (codeMap[str.charAt(i)]) {
            // 可以组1个字符
            t = dp
        } else {
            // 不可以组任何字符，是0
            return 0
        }
    }
    return dp
};
// @lc code=end
// console.log(numDecodings('24726') === 4);
// console.log(numDecodings('10') === 1);
// console.log(numDecodings('20') === 1);
// console.log(numDecodings('0') === 0);
// console.log(numDecodings('01') === 0);
// console.log(numDecodings('12') === 2);
// console.log(numDecodings('226') === 3);
// console.log(numDecodings('1223') === 5);
