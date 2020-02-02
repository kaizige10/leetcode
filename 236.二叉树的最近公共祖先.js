/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * 
 */
// 思路4：迭代(参考官方解答的方法三)
// 使用栈保存当前节点的所有祖先，
// 栈的元素为一个对象，形为：{node: root, leftDone: false, rightDone: false}
// 即当前节点，左子树是否遍历完，右子树是否遍历完
// 第一次找到p或者q时，设置LCA_index的值为p或者q的深度
// 每当stack pop时，LCA_index减少1，因为此时p和q肯定不在同一个子树，所以最近公共祖先需要向上移动
// 第二次找到p或者q时，直接返回LCA_index的节点即可
var lowestCommonAncestor = function (root, p, q) {
    let stack = [{ node: root, leftDone: false, rightDone: false }]
    let LCA_index = -1, firstFound
    while (stack.length) {
        let obj = stack[stack.length - 1]
        let { node } = obj
        if (node == p || node == q) {
            if (LCA_index === -1) {
                // 第一次发现时，记录LCA_index，记录是谁被发现
                LCA_index = stack.length - 1
                node == p && (firstFound = p)
                node == q && (firstFound = q)
            } else if (node != firstFound){
                // 第二次发现时，直接返回LCA_index对应的节点
                return stack[LCA_index].node
            }
        }

        if (node.left && !obj.leftDone) {
            obj.leftDone = true
            stack.push({ node: node.left, leftDone: false, rightDone: false })
        } else if (node.right && !obj.rightDone) {
            obj.rightDone = true
            stack.push({ node: node.right, leftDone: false, rightDone: false })
        } else {
            if (firstFound && LCA_index === stack.length - 1) LCA_index--
            stack.pop()
        }
    }
    return null
}
// @lc code=end
// 思路3：迭代，
// 深度优先搜索，使用一个栈保存当前节点的所有祖先，
// 使用哈希表保存当前节点是否访问过左子树和右子树
// 额外空间使用了栈和哈希表，因此空间复杂度是O(n)
var lowestCommonAncestor3 = function (root, p, q) {
    let ps = [], qs = [], stack = [root], isVisited = new Map()
    while (!ps.length || !qs.length) {
        let cur = stack[stack.length - 1]
        if (cur == p && !ps.length) ps = [...stack]
        if (cur == q && !qs.length) qs = [...stack]

        let visited
        if (isVisited.has(cur)) {
            visited = isVisited.get(cur)
        } else {
            visited = {}
            isVisited.set(cur, visited)
        }
        if (cur.left && !visited.left) {
            stack.push(cur.left)
            isVisited.set(cur, { left: true, ...visited })
        } else if (cur.right && !visited.right) {
            stack.push(cur.right)
            isVisited.set(cur, { right: true, ...visited })
        } else {
            stack.pop()
        }
    }

    let n = Math.min(ps.length, qs.length);
    for (let i = 0; i < n - 1; i++) {
        if (ps[i] == qs[i] && ps[i + 1] != qs[i + 1]) return ps[i]
    }
    if (ps.length < qs.length) {
        return ps[ps.length - 1]
    } else {
        return qs[qs.length - 1]
    }
}

// 思路2：一次递归
// 如果当前节点的左子树找到了，并且右子树找到了，那么最近公共节点就是该节点
// 如果当前节点就是p or q，并且左右子树找到了，那么最近公共节点也是该节点
// 如果当前节点就是p or q，并且左右子树都没找到，那么返回true表示作为子树找到了p or q
let node
let lowestCommonAncestor2 = function (root, p, q) {
    findNode(root, p, q)
    return node
};

function findNode(root, p, q) {
    if (!root) return false
    // 我是不是p或者q？
    let meResult = root == p || root == q ? 1 : 0
    // 左子树的结果
    let leftResult = findNode(root.left, p, q) ? 1 : 0
    // 右子树的结果
    let rightResult = findNode(root.right, p, q) ? 1 : 0

    // 自己是，或者左右子树找到了，3中2即找到了最近的公共祖先（自己）
    if (meResult + leftResult + rightResult >= 2) {
        node = root
    }
    // 其他结果
    return meResult + leftResult + rightResult > 0
}

// 思路1：2次递归
// 每次判断当前节点是否是p或者q，参数把祖先节点的数组传入
// 对于最差的单链表的场景，递归的空间复杂度为O(n)，
// 我的解法在某一场景下堆内存不够了：JavaScript heap out of memory
var lowestCommonAncestor1 = function (root, p, q) {
    let ps = getAncestors(root, p, [])
    let qs = getAncestors(root, q, [])

    let n = Math.min(ps.length, qs.length);
    for (let i = 0; i < n - 1; i++) {
        if (ps[i] == qs[i] && ps[i + 1] != qs[i + 1]) return ps[i]
    }
    if (ps.length < qs.length) {
        return ps[ps.length - 1]
    } else {
        return qs[qs.length - 1]
    }
};

/**
 * 递归求得node的所有祖先节点
 * @param {*} root 当前节点
 * @param {*} node p或者q
 * @param {*} ancestors 当前节点的祖先节点
 */
function getAncestor(root, node, ancestors) {
    // 找到了，返回node的祖先节点（含自己）
    if (root == node) return [...ancestors, root]
    // 到达叶子节点，说明找不到，返回空
    if (!root.left && !root.right) {
        return null
    }
    let ans = null
    // 找左子树，找到了就直接返回
    if (root.left) {
        ans = getAncestors(root.left, node, [...ancestors, root])
        if (ans) {
            return ans
        }
    }
    // 找右子树，找到了就直接返回
    if (root.right) {
        ans = getAncestors(root.right, node, [...ancestors, root])
    }
    return ans
}

// 测试代码
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
// }
// let node3 = new TreeNode(3)
// let node5 = new TreeNode(5)
// let node1 = new TreeNode(1)
// let node6 = new TreeNode(6)
// let node2 = new TreeNode(2)
// let node0 = new TreeNode(0)
// let node8 = new TreeNode(8)
// let node7 = new TreeNode(7)
// let node4 = new TreeNode(4)
// node3.left = node5
// node3.right = node1
// node5.left = node6
// node5.right = node2
// node2.left = node7
// node2.right = node4
// node1.left = node0
// node1.right = node8

// let res = lowestCommonAncestor(node3, node5, node1)
// console.log(res);