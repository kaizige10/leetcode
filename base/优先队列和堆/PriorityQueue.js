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
        return this.list[1];
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

// let maxPQ = new PriorityQueue([1,12,7,3,6,4])
// console.table(maxPQ.list);
// maxPQ.push(9)
// console.table(maxPQ.list);
// console.log(maxPQ.pop());
// console.table(maxPQ.list);