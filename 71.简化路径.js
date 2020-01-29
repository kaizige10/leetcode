/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    let stack = []
    let pathArr = path.split('/')
    pathArr.forEach(folderName => {
        if (folderName === '' || folderName === '.') {
            return
        } else if (folderName === '..') {
            stack.pop()
        } else {
            stack.push(folderName)
        }
    })
    return '/' + stack.join('/')
}
// var simplifyPath2 = function (path) {
//     let stack = []
//     let i = 0
//     while (i < path.length) {
//         let str = path.charAt(i)
//         if (str === '/') {
//             const folderName = getFolderName(path, ++i)
//             if (folderName === '') continue
//             if (folderName === '.') {
//                 i += 1
//                 continue
//             } else if (folderName === '..') {
//                 i += 2
//                 stack.pop()
//             } else {
//                 i += folderName.length
//                 stack.push(folderName)
//             }
//         } else {
//             console.log('不会走到这里的', str);
//             i++;
//         }
//     }
//     console.log('stack', stack);

//     return '/' + stack.join('/')
// }

// function getFolderName(path, i) {
//     let index = i;
//     while (index < path.length && path.charAt(index) !== '/') {
//         index++
//     }
//     return path.substring(i, index)
// }
// @lc code=end

// console.log(simplifyPath('/home'))
// console.log(simplifyPath('/../'))
// console.log(simplifyPath('/home//foo'))
// console.log(simplifyPath('/a/./b/../../c/'))
// console.log(simplifyPath('/a/../../b/../c//.//'))
// console.log(simplifyPath('/a//b////c/d//././/..'))
// console.log(simplifyPath('/a//b////c/d//././/..'))
// console.log(simplifyPath('/a/./b/../../c/'))
