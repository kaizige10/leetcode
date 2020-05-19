/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
 */

// @lc code=start

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
    /**
     * 删除最大元素并返回
     * @returns 返回最大的元素
     */
    function delMax() {
        let max = list[1];
        // 首尾交换
        _swap(list.length - 1, 1);
        // 删除最大元素
        list.length = list.length - 1;
        // 将交换来的最小元素下沉
        _down(1);
        return max;
    }

    // 获取父元素的下标
    function _parent(k) {
        return Math.floor(k / 2);
    }

    /**
     * 将第k个元素下沉
     * @param {number} k 第k个元素下标
     */
    function _down(k) {
        let to = k;
        // 和左子节点比较，是否要下沉
        let left = k * 2;
        if (left < list.length && list[to] < list[left]) {
            to = left;
        }
        // 和右子节点比较，是否要下沉
        let right = k * 2 + 1;
        if (right < list.length && list[to] < list[right]) {
            to = right;
        }
        if (to !== k) {
            _swap(k, to);
            // 递归向下沉
            _down(to);
        }
    }

    /**
     * 交换
     */
    function _swap(k1, k2) {
        let temp = list[k1];
        list[k1] = list[k2];
        list[k2] = temp;
    }

    const list = [null, ...stones];
    // 堆化操作：从最后一个元素的父节点开始下沉
    for (let i = _parent(list.length - 1); i >= 1; i--) {
        _down(i);
    }

    while (list.length > 2) {
        let first = delMax();
        let second = list[1];
        let newStone = Math.abs(first - second);
        if (newStone > 0) {
            list[1] = newStone;
            _down(1);
        } else {
            delMax();
        }

    }
    if (list.length === 2) {
        return list[1];
    } else {
        return 0;
    }
};

// @lc code=end

// console.log(lastStoneWeight([2,7,4,1,8,1]));
// console.log(lastStoneWeight([3]));
// console.log(lastStoneWeight([5,5,5]));
// console.log(lastStoneWeight([5, 5]));
// console.log(lastStoneWeight([99,55,3,4]));