/*
 * @lc app=leetcode.cn id=923 lang=javascript
 *
 * [923] 三数之和的多种可能
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function(A, target) {
    A.sort((a,b) => a-b)
    
    let count = 0
    for (let fix = 0; fix < A.length-2;fix++) {
        for (let l = fix+1, r=A.length-1; l<r; ) {
            let sum = A[fix] +A[l] +A[r];
            if (sum < target) {
                l++
            } else if (sum > target) {
                r--
            } else {
                if (A[l] !== A[r]) {
                    let lcount = 1, rcount = 1
                    l++
                    r--
                    while (l <= r && A[l-1] === A[l]) {
                        lcount++
                        l++
                    }
                    while (l <= r && A[r] === A[r+1]) {
                        rcount++
                        r--
                    }
                    // console.log(`found: ${[A[fix], A[l-1], A[r+1]]}, lcount=${lcount}, rcount=${rcount}`,)
                    count += lcount * rcount
                } else {
                    let len = r - l + 1
                    count += len * (len - 1) / 2
                    break
                }
            }
        }
    }
    return count % (1000000000 + 7)
};
// @lc code=end

// test
console.log(threeSumMulti([18,73,19,19,55,88,6,34,21,75] ,58))