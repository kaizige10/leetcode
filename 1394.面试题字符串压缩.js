/**
 * @param {string} S
 * @return {string}
 */
var compressString1 = function(S) {
    let len = S.length
    let compressed = '', temp = 1
    for (let i = 0; i < len; i++) {
        if (S.charAt(i) !== S.charAt(i+1)) {
            compressed += S.charAt(i) + temp
            temp = 1
        } else {
            temp++
        }
    }
    if (compressed.length < len) {
        return compressed
    } else {
        return S
    }
};

var compressString = function(S) {
    let len = S.length
    let strArr = S.split('')
    let compressed = [], temp = 1
    for (let i = 0; i < len; i++) {
        if (strArr[i+1] !== strArr[i]) {
            compressed.push(strArr[i], temp)
            temp = 1
        } else {
            temp++
        }
    }
    if (compressed.length < len) {
        return compressed.join('')
    } else {
        return S
    }
};

console.log(compressString('aabcccccaaa') === 'a2b1c5a3')
console.log(compressString('abbccd') === 'abbccd')
console.log(compressString("aabcccccaa") === "a2b1c5a2")