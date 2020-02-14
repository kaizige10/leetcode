/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let min = 0, max = x, mid
    while(1) {
        mid = Math.floor((min + max) / 2)
        let t = mid * mid
        if (t === x) return mid
        if (t > x) {
            if ((mid-1) * (mid-1) < x) return mid-1
            if (max===mid) {
                max--
            } else {
                max = mid
            }
        } else {
            if ((mid+1)*(mid+1) > x) return mid
            if (min === mid) {
                min++
            }else{
                min = mid
            }
        }
    }
    return x
}
// @lc code=end

// console.log(`1 ${mySqrt(1)}`);
// console.log(`2 ${mySqrt(2)}`);
// console.log(`3 ${mySqrt(3)}`);
// console.log(`4 ${mySqrt(4)}`);
// console.log(`5 ${mySqrt(5)}`);
// console.log(`6 ${mySqrt(6)}`);
// console.log(`7 ${mySqrt(7)}`);
// console.log(`8 ${mySqrt(8)}`);
// console.log(`9 ${mySqrt(9)}`);
// console.log(`10 ${mySqrt(10)}`);
// console.log(`15 ${mySqrt(15)}`);
// console.log(`16 ${mySqrt(16)}`);
// console.log(`17 ${mySqrt(17)}`);

// let re = mySqrt(1)
// console.log(re);


