/**
 * 注：个人研究js的LinkList代码，非业务代码
 */
class Node {
  constructor(val, next, prev) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

/**
 * 双向链表
 * 实现了insert, delete, clear, push, pop, get, set, 
 * link, reverse, sort, indexOf, lastIndexOf, contains操作
 * toString方法可将链表转换成易读的字符串，内部使用JSON.stringify函数
 */
class LinkList {
  /**
   * 构造LinkList
   * 1.传入数字，表示构造多个val为null的LinkList
   * 2.传入数组，表示构造的LinkList数据来源于此数组
   * 
   * 3.传入一个LinkList实例，用LinkList实例来构造
   * @param {*} arg
   */
  constructor(arg) {
    if (typeof arg === "number" && arg > 0) {
      // 构造val为null的的链表
      this.head = new Node(null, null, null);
      let cur = this.head;
      for (let i = 1; i < arg; i++) {
        let node = new Node(null, null, cur);
        cur.next = node;
        cur = node;
      }
      this.tail = cur;
      this.length = arg;
    } else if (Array.isArray(arg) && arg.length > 0) {
      // 构造val为数组元素的链表
      this.head = new Node(arg[0], null, null);
      let cur = this.head;
      for (let i = 1; i < arg.length; i++) {
        let node = new Node(arg[i], null, cur);
        cur.next = node;
        cur = node;
      }
      this.tail = cur;
      this.length = arg.length;
    } else if (this._isLinkList(arg)) {
      // 传入的参数是LinkList实例
      this.head = arg.head;
      this.tail = arg.tail;
      this.length = arg.length;
    } else {
      this.head = this.tail = null;
      this.length = 0;
    }
  }

  _isLinkList(arg) {
    return (
      arg &&
      arg.constructor &&
      arg.constructor.toString().indexOf("class LinkList") !== -1
    );
  }

  /**
   * 将当前链表和传入的链表进行连接
   * @param {LinkList} otherList
   */
  link(otherList) {
    if (!this._isLinkList(otherList)) throw "the argument must be a LinkList!";
    if (this.length === 0) {
      this.head = otherList.head;
      this.tail = otherList.tail;
      this.length = otherList.length;
    } else {
      this.tail.next = otherList.head;
      otherList.head.prev = this.tail;
      this.tail = otherList.tail;
      this.length += otherList.length;
    }
  }

  /**
   * 链表转字符串
   * @param {string} type 遍历类型，传reverse表示倒序遍历
   */
  toString(type) {
    if (this.length === 0) return "";
    let str = "";
    if (type === "reverse") {
      let cur = this.tail;
      while (cur) {
        str += JSON.stringify(cur.val);
        if (cur.prev) str += " <=> ";
        cur = cur.prev;
      }
    } else {
      let cur = this.head;
      while (cur) {
        str += JSON.stringify(cur.val);
        if (cur.next) str += " <=> ";
        cur = cur.next;
      }
    }
    return str;
  }

  /**
   * 插入元素
   * 如果index大于当前长度，则在最后插入
   * @param {number} index 待插入的位置
   * @param {*} val 插入的元素
   */
  insert(index, val) {
    if (index < -1 * this.length) return;
    if (index < 0) index += this.length; // 小于0的index，转成正的，方便计算

    if (this.length === 0) {
      this.head = this.tail = new Node(val, null, null);
    } else if (index === 0) {
      // 插入头结点
      let next = this.head;
      this.head = new Node(val, next, null);
      if (next) next.prev = this.head;
    } else if (index >= this.length) {
      // 插入尾结点
      let originTail = this.tail;
      this.tail = new Node(val, null, originTail);
      originTail.next = this.tail;
    } else {
      if (index <= (this.length - 1) >> 1) {
        // 在前半段，从head开始遍历插入
        let sentinel = { next: this.head };
        let cur = this.head,
          prev = sentinel;
        for (let i = 0; i < this.length && i < index; i++) {
          prev = cur;
          cur = cur.next;
        }
        let insertNode = new Node(val, cur, prev);
        prev.next = insertNode;
        cur.prev = insertNode;
        sentinel.next = null; // 用完释放
      } else {
        // 在后半段，从tail开始遍历插入
        let sentinel = { prev: this.tail };
        let cur = this.tail,
          prev = sentinel;
        for (let i = this.length - 1; i >= 0 && i >= index; i--) {
          prev = cur;
          cur = cur.prev;
        }
        let insertNode = new Node(val, prev, cur);
        prev.prev = insertNode;
        cur.next = insertNode;
        sentinel.prev = null; // 用完释放
      }
    }
    this.length++;
  }

  /**
   * 删除元素
   * @param {number} index 待删除的位置
   */
  delete(index) {
    if (index < -1 * this.length || index > this.length - 1) return;
    if (index < 0) index += this.length; // 小于0的index，转成正的，方便计算

    if (this.length === 0) return;
    if (this.length === 1) {
      // 只有一个元素，直接干掉
      this.head = this.tail = null;
    } else if (index === 0) {
      // 删除头结点
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
    } else if (index >= this.length - 1) {
      // 删除尾结点
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
    } else if (index <= (this.length - 1) >> 1) {
      // 在前半段，从head开始遍历
      let sentinel = { next: this.head };
      let cur = this.head,
        prev = sentinel;
      for (let i = 0; i < this.length && i < index; i++) {
        prev = cur;
        cur = cur.next;
      }
      prev.next = cur.next; // 前一个指向cur的后一个
      if (cur.next) cur.next.prev = prev; // cur后一个的prev指向前一个
      cur.prev = null;
      cur.next = null;
      sentinel.next = null; // 用完释放
    } else {
      // 在后半段，从tail开始遍历
      let sentinel = { prev: this.tail };
      let cur = this.tail,
        prev = sentinel;
      for (let i = this.length - 1; i >= 0 && i > index; i--) {
        prev = cur;
        cur = cur.prev;
      }
      prev.prev = cur.prev;
      if (cur.prev) cur.prev.next = prev;
      cur.prev = null;
      cur.next = null;
      sentinel.prev = null; // 用完释放
    }
    this.length--;
  }

  /**
   * 清空链表
   */
  clear() {
    for (let cur = this.head; cur;) {
      let t = cur.next;
      cur.next = cur.prev = cur.val = null;
      cur = t;
    }
    this.head = this.tail = null;
    this.length = 0;
  }

  /**
   * 根据下标取值，范围支持[-length, length)
   * @param {number} index
   */
  get(index) {
    if (index < -1 * this.length || index > this.length - 1) return;
    if (index < 0) index += this.length; // 小于0的index，转成正的，方便计算
    if (0 <= index && index <= (this.length - 1) >> 1) {
      // 在前半段，从head开始遍历
      let cur = this.head;
      for (let i = 0; i < index; i++) {
        cur = cur.next;
      }
      return cur.val;
    } else {
      // 在后半段，从tail开始遍历
      let cur = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        cur = cur.prev;
      }
      return cur.val;
    }
  }

  /**
   * 根据下标重新设置值，范围支持[-length, length)
   * @param {number} index 下标
   * @param {*} val 值
   * @returns {boolean} result 结果
   */
  set(index, val) {
    if (index < -1 * this.length || index > this.length - 1) return false;
    if (index < 0) index += this.length; // 小于0的index，转成正的，方便计算
    if (0 <= index && index <= (this.length - 1) >> 1) {
      // 在前半段，从head开始遍历
      let cur = this.head;
      for (let i = 0; i < index; i++) {
        cur = cur.next;
      }
      cur.val = val;
    } else {
      // 在后半段，从tail开始遍历
      let cur = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        cur = cur.prev;
      }
      cur.val = val;
    }
    return true;
  }

  /**
   * 在尾部添加元素
   * @param {*} val 元素
   */
  push(val) {
    this.insert(this.length, val);
  }

  /**
   * 弹出尾部元素
   * @returns {*} val
   */
  pop() {
    if (this.length === 0) return;
    if (this.length === 1) {
      const t = this.tail;
      this.head = this.tail = null;
      this.length--;
      return t.val;
    } else {
      const t = this.tail;
      this.tail = t.prev;
      this.tail.next = null;
      this.length--;
      return t.val;
    }
  }

  /**
   * 查找元素的位置
   * @param {*} val 元素
   */
  indexOf(val) {
    for (let cur = this.head, i = 0; cur; i++, cur = cur.next) {
      if (cur.val === val) return i;
    }
    return -1;
  }

  /**
   * 反向查找元素的位置
   * @param {*} val 元素
   */
  lastIndexOf(val) {
    for (let cur = this.tail, i = this.length - 1; cur; i--, cur = cur.prev) {
      if (cur.val === val) return i;
    }
    return -1;
  }

  /**
   * 判断元素是否在链表中
   * @param {*} val 元素
   */
  contains(val) {
    return this.indexOf(val) !== -1;
  }

  /**
   * 反转链表
   */
  reverse() {
    if (this.length <= 1) return;
    // 把头指针和尾指针交换即可
    let headNext = this.head.next;
    let tailPrev = this.tail.prev;
    [this.head, this.tail] = [this.tail, this.head];
    [this.tail.prev, this.tail.next, tailPrev.next] = [
      tailPrev,
      null,
      this.tail
    ];
    [this.head.next, this.head.prev, headNext.prev] = [
      headNext,
      null,
      this.head
    ];
  }

  /**
   * 排序链表，使用快速排序算法
   * @param {function} compareFun 自定义比较函数，返回值是-1表示左比右小，0表示相等，1表示左比右大
   */
  sort(compareFun) {
    if (this.length <= 1) return;
    this._part(this.head, this.tail, compareFun);
  }

  /**
   * 默认的比较函数
   * @param {*} a
   * @param {*} b
   */
  _defaultCompareFun(a, b) {
    if (a < b) return -1;
    if (a == b) return 0;
    if (a > b) return 1;
  }

  /**
   * 递归分块函数
   * @param {Node} l 左指针
   * @param {Node} r 右指针
   * @param {function} compareFun 比较函数
   */
  _part(l, r, compareFun = this._defaultCompareFun) {
    if (r == null || l == null || l === r || l.prev === r) return;
    // 为了简单，pivot每次选取头节点
    let pivot = l;
    let L = l,
      R = r;
    while (L !== R) {
      // 从右找比pivot小的元素
      while (L !== R && compareFun(R.val, pivot.val) >= 0) R = R.prev;
      // 从左找比pivot大的元素
      while (L !== R && compareFun(L.val, pivot.val) <= 0) L = L.next;

      if (L !== R) {
        // 找到这样的2个元素，交换
        [L.val, R.val] = [R.val, L.val];
      }
    }
    if (R !== pivot) {
      // R若等于pivot，说明右边的数比pivot都大
      // 交换pivot到L和R碰撞的点
      [pivot.val, R.val] = [R.val, pivot.val];
    }
    // 递归调用_part继续排序
    this._part(l, R.prev, compareFun);
    this._part(R.next, r, compareFun);
  }
}
module.exports = LinkList;
// //! 测试创建链表
// var list = new LinkList([3, 7, 4, 9, 1, 5, 2, 8]);
// var list2 = new LinkList(list);
// console.log(list.toString() === list2.toString());

// //!测试创建linkList
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// console.log(
//   list.toString() === `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") ===
//   `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// var list = new LinkList(3);
// console.log(list.toString() === `null <=> null <=> null`);
// console.log(list.toString("reverse") === `null <=> null <=> null`);
// //!测试排序链表
// var list = new LinkList([3, 7, 4, 9, 1, 5, 2, 8]);
// list.sort();
// console.log(list.toString() === `1 <=> 2 <=> 3 <=> 4 <=> 5 <=> 7 <=> 8 <=> 9`);
// var list = new LinkList([
//   { name: "5", age: 5 },
//   { name: "99", age: 99 },
//   { name: "37", age: 37 },
//   { name: "82", age: 82 }
// ]);
// list.sort((a, b) => b.age - a.age); // 根据年龄倒序
// console.log(
//   list.toString() ===
//   `{"name":"99","age":99} <=> {"name":"82","age":82} <=> {"name":"37","age":37} <=> {"name":"5","age":5}`
// );

// //!测试反转链表
// var list = new LinkList([3, 7, 4]);
// list.reverse();
// console.log(list.toString() === `4 <=> 7 <=> 3`);
// //!测试push和pop
// var list = new LinkList([3, 7]);
// list.push(911);
// console.log(list.get(-1) === 911);
// console.log(list.pop() === 911);
// console.log(list.pop() === 7);
// console.log(list.pop() === 3);
// console.log(list.pop() === undefined);
// //!测试获取节点
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// console.log(list.get(0) === 3);
// console.log(list.get(5) === "yangkai");
// console.log(list.get(list.length - 1).age === 3);
// console.log(list.get(-2) === "yangkai");
// console.log(list.get(-5) === 2);
// //!测试设置节点
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// console.log(list.set(20, 1) === false);
// console.log(list.set(2, 1) === true);
// console.log(list.get(-5) === 1);
// console.log(list.set(-1, "test") === true);
// console.log(list.get(6) === "test");

// //!测试插入头结点
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.insert(0, "hahah");
// console.log(
//   list.toString() ===
//   `"hahah" <=> 3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") ===
//   `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3 <=> "hahah"`
// );
// //!测试插入尾结点
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.insert(7, "hahah");
// console.log(
//   list.toString() ===
//   `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3} <=> "hahah"`
// );
// console.log(
//   list.toString("reverse") ===
//   `"hahah" <=> {"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// //!测试插入-靠前
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.insert(2, "hahah");
// console.log(
//   list.toString() ===
//   `3 <=> 7 <=> "hahah" <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") ===
//   `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> "hahah" <=> 7 <=> 3`
// );
// //!测试插入-靠后
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.insert(6, "dingrui");
// console.log(
//   list.toString() ===
//   `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> "dingrui" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") ===
//   `{"age":3} <=> "dingrui" <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// //!测试删除头结点
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.delete(0);
// console.log(
//   list.toString() === `7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") === `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7`
// );
// //!测试删除尾巴
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.delete(6);
// console.log(list.toString() === `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai"`);
// console.log(
//   list.toString("reverse") === `"yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// //!测试删除超过length
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.delete(7);
// console.log(
//   list.toString() === `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") ===
//   `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// //!测试删除中间的节点-靠后
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.delete(5);
// console.log(list.toString() === `3 <=> 7 <=> 2 <=> 6 <=> 9 <=> {"age":3}`);
// console.log(
//   list.toString("reverse") === `{"age":3} <=> 9 <=> 6 <=> 2 <=> 7 <=> 3`
// );
// //!测试删除中间的节点-靠前
// var list = new LinkList([3, 7, 2, 6, 9, "yangkai", { age: 3 }]);
// list.delete(2);
// console.log(
//   list.toString() === `3 <=> 7 <=> 6 <=> 9 <=> "yangkai" <=> {"age":3}`
// );
// console.log(
//   list.toString("reverse") === `{"age":3} <=> "yangkai" <=> 9 <=> 6 <=> 7 <=> 3`
// );

// //! 测试合并链表
// var list1 = new LinkList([3, 7, 2]);
// var list2 = new LinkList(["yangkai", { age: 3 }]);
// list1.link(list2);
// console.log(list1.toString() === `3 <=> 7 <=> 2 <=> "yangkai" <=> {"age":3}`);
// console.log(list1.length === 5);

// //! 测试清空链表
// var list1 = new LinkList([3, 7, 2]);
// list1.clear()
// console.log(list1.length === 0);
// console.log(list1.toString() === '');

// //! 测试查找元素位置
// var list1 = new LinkList([3, 7, 2, 7]);
// console.log(list1.indexOf(7) === 1)
// console.log(list1.indexOf("7") === -1)
// console.log(list1.lastIndexOf("7") === -1)
// console.log(list1.lastIndexOf(7) === 3)
// console.log(list1.contains(6) === false);
// console.log(list1.contains(2) === true);