/**
 * 字符串匹配BF算法
 * @param {string} str 原串
 * @param {string} pattern 模式串
 */
function bf(str, pattern) {
    for (let i = 0; i < str.length - pattern.length + 1; i++) {
        let isMatch = true;
        for (let j = 0; j < pattern.length; j++) {
            if (str.charAt(i +j) !== pattern.charAt(j)) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) return i;
    }
    return -1;
}

console.log(bf('aaaaaaaab', 'aaaaab'));
console.log(bf('aaaaaaaab', 'aaaaac'));
console.time('bf')
let str = Array(30000).fill('a').join('') + 'b';
let pattern = Array(5000).fill('a').join('') + 'b';
console.log(bf(str, pattern));
console.timeEnd('bf')