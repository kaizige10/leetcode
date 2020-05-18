/**
 * 最大堆实现优先队列
 */
class MaxPQ {
    list = []

    constructor(arr) {
        // 复制传入的数组，把第一个元素空着
        this.list = [null, ...arr];
        // 堆化操作：从最后一个元素的父节点开始下沉
        for (let i = this._parent(this.list.length - 1); i >= 1; i--) {
            this._down(i);
        }
    }

    /**
     * 插入一个元素
     * @param {any} val 插入的元素
     */
    insert(val) {
        this.list.push(val);
        this._up(this.list.length - 1);
    }

    /**
     * 删除最大元素并返回
     * @returns 返回最大的元素
     */
    delMax() {
        let max = this.max();
        // 首尾交换
        this._swap(this.list.length - 1, 1);
        // 删除最大元素
        this.list.length = this.list.length - 1;
        // 将交换来的最小元素下沉
        this._down(1);
        return max;
    }

    /**
     * 返回最大的元素
     * @returns 返回最大的元素
     */
    max() {
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
        if (parent >= 1 && this.list[k] > this.list[parent]) {
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
        if (left < this.list.length && this.list[to] < this.list[left]) {
            to = left;
        }
        // 和右子节点比较，是否要下沉
        let right = k * 2 + 1;
        if (right < this.list.length && this.list[to] < this.list[right]) {
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

const maxPQ = new MaxPQ([4, 6, 7, 3, 8, 9, 1])
console.log(maxPQ.list)
console.log(maxPQ.max());
console.log(maxPQ.delMax());
console.log(maxPQ.list)
console.log(maxPQ.insert(10));
console.log(maxPQ.list)