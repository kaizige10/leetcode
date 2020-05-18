/**
 * 字符串匹配RK算法
 * @param {string} str 原串
 * @param {string} pattern 模式串
 */
function rk(str, pattern) {
    // 计算模式串的hash值，用简单的charCode来算
    let patHash = pattern.split('').map(ch => ch.charCodeAt(0)).reduce((prev, curr) => prev + curr, 0);
    let strHash = str.split('').filter((ch, i) => i < pattern.length).map(ch => ch.charCodeAt(0)).reduce((prev, curr) => prev + curr, 0);
    
    
    for (let i = 0; i < str.length - pattern.length + 1; i++) {
        let isMatch = true;
        if (strHash === patHash) {
            for (let j = 0; j < pattern.length; j++) {
                if (str.charAt(i +j) !== pattern.charAt(j)) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) return i;// 成功匹配则返回
        }
        // 走到这里说明不成功，重新计算str的哈希值
        strHash += str.charCodeAt(i + pattern.length) - str.charCodeAt(i);
    }
    return -1;
}

console.log(rk('0001', '01'));
console.log(rk('0001', '02'));
console.log(rk('0001', '00'));
console.log(rk('abacaaabdabaca', 'aba'));
console.log(rk('abacaaabdabaca', 'abd'));

console.time('rk')
let str = Array(300000).fill('a').join('') + 'b';
let pattern = Array(5000).fill('a').join('') + 'b';
console.log(rk(str, pattern));
console.timeEnd('rk')