class MaxHeap {
    list = []

    constructor(arr = []) {
        // 复制传入的数组，把第一个元素空着
        this.list = [null, ...arr];
        // 堆化操作：从最后一个元素的父节点开始下沉
        for (let i = this._parent(this.list.length - 1); i >= 1; i--) {
            this.down(i);
        }
    }

    up(idx) {
        let parent = this._parent(idx);
        if (parent >= 1 && this.list[parent] < this.list[idx]) {
            this._swap(parent, idx);
            // 递归上浮
            this.up(parent);
        }
    }

    down(idx) {
        let to = idx;
        // 和左子元素比较
        let left = idx * 2;
        if (left < this.list.length && this.list[left] > this.list[to]) {
            to = left;
        }
        // 和右子元素比较
        let right = idx * 2 + 1;
        if (right < this.list.length && this.list[right] > this.list[to]) {
            to = right;
        }
        if (to !== idx) {
            this._swap(to, idx);
            // 递归下沉
            this.down(to);
        }
    }

    // 获取父元素的下标
    _parent(k) {
        return Math.floor(k / 2);
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

// const max = new MaxHeap([3,9,5,1,7])
// console.log(max.list);