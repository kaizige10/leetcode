/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    if (s.length <= 1) return s;
    // map存储字符->count
    const map = new Map();
    s.split('').forEach(ch => {
        if (map.has(ch)) {
            map.set(ch, map.get(ch) + 1);
        } else {
            map.set(ch, 1);
        }
    });

    // 构造优先级队列，以count为优先级构造最大堆
    const arr = [];
    map.forEach((val, key) => arr.push({str: key, count: val}));
    const maxPQ = new PriorityQueue(arr, (a, b) => a.count - b.count);

    // 结果字符串
    let result = "";
    while(!maxPQ.isEmpty()) {
        // 取出堆顶元素
        const {str, count} = maxPQ.pop();
        result += Array(count).fill(str).join('');
    }
    return result;
};

class PriorityQueue {
    constructor(arr = [], compareFun = this._defaultCompareFun) {
        this.list = [null, ...arr];
        this.compareFun = compareFun;
        // 堆化操作：从最后一个元素的父节点开始下沉
        for (let i = this._parent(this.list.length - 1); i >= 1; i--) {
            this._down(i);
        }
    }

    // 默认比较函数
    _defaultCompareFun(a, b) {
        return a - b;
    }

    _isSmall(a, b) {
        return this.compareFun(a, b) < 0;
    }

    isEmpty() {
        return this.list.length === 1;
    }

    /**
     * 插入一个元素
     * @param {any} val 插入的元素
     */
    push(val) {
        this.list.push(val);
        this._up(this.list.length - 1);
    }

    /**
     * 删除堆顶元素并返回
     * @returns 返回堆顶的元素
     */
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        let max = this.peek();
        // 首尾交换
        this._swap(this.list.length - 1, 1);
        // 删除最大元素
        this.list.length = this.list.length - 1;
        // 将交换来的最小元素下沉
        this._down(1);
        return max;
    }

    /**
     * 返回堆顶元素
     * @returns 返回堆顶元素
     */
    peek() {
        return this.isEmpty() ? null : this.list[1];
    }

    // 获取父元素的下标
    _parent(k) {
        return Math.floor(k / 2);
    }

    /**
     * 将第k个元素上浮
     * @param {number} k 第k个元素下标
     */
    _up(k) {
        let parent = this._parent(k);
        // 元素k大于父元素，要上浮
        if (parent >= 1 && this._isSmall(this.list[parent], this.list[k])) {
            this._swap(k, parent);
            // 递归向上浮动
            this._up(parent);
        }
    }

    /**
     * 将第k个元素下沉
     * @param {number} k 第k个元素下标
     */
    _down(k) {
        let to = k;
        // 和左子节点比较，是否要下沉
        let left = k * 2;
        if (left < this.list.length && this._isSmall(this.list[to], this.list[left])) {
            to = left;
        }
        // 和右子节点比较，是否要下沉
        let right = k * 2 + 1;
        if (right < this.list.length && this._isSmall(this.list[to], this.list[right])) {
            to = right;
        }
        if (to !== k) {
            this._swap(k, to);
            // 递归向下沉
            this._down(to);
        }
    }

    /**
     * 交换
     */
    _swap(k1, k2) {
        let temp = this.list[k1];
        this.list[k1] = this.list[k2];
        this.list[k2] = temp;
    }
}

// @lc code=end

// console.log(frequencySort('tree'));
// console.log(frequencySort('cccaaa'));
// console.log(frequencySort('Aabb'));