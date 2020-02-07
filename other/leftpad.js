function leftpad1(str, len, ch) {
    let length = len - str.length
    return Array(length + 1).join(ch) + str
}

console.time('leftpad1')
for (let i = 0; i < 100000; i++) {
    leftpad1('kaizige', 10000, '2')
}
console.timeEnd('leftpad1')


function leftpad2(str, len, ch) {
    let length = len - str.length
    while(length > 0) {
        if (length===1) return ch + str
        if (length & 1) str = ch + str // length为奇数
        ch += ch
        length = length >> 1// length除以2（取整）
    }
    return str
}

console.time('leftpad2')
for (let i = 0; i < 100000; i++) {
    leftpad2('kaizige', 10000, '2')
}
console.timeEnd('leftpad2')