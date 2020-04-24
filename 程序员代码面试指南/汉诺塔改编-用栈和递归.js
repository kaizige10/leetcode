const Stack = require("../base/Stack.js");

/**
 * 
 * @param {Stack} A 
 * @param {Stack} B 
 * @param {Stack} C 
 */
function hanota(A, B, C) {
    while(!A.isEmpty()) {
        moveTop2Bottom(A, B, C)
    }
    return C
}

/**
 * @param {Stack} from
 * @param {Stack} B 
 * @param {Stack} to 
 */
function moveTop2Bottom(from, B, to) {
    if (to.isEmpty()) {
        console.log(`move ${from.peek()} from `)
        to.push(from.pop())
    }
}
/**
 * @param {Stack} from
 * @param {Stack} to 
 */
function move(from, to) {
    console.log(`move ${from.peek()} from `)
}