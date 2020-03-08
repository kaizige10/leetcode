// 有n种物品和一个容量为W的背包，每种物品都有无限件可用。第i种物品的重量是w[i]，价值是v[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
// 比如如下物品(每个物品的信息为[w, v])：[[2, 3], [3,4], [4,5], [5,8], [9,10]],背包容量为20，选择4个第3件物品时价值最大，为32

// 思路1：递推（循环）
// 递归的公式是： f(i, w) = max(f(i-1, w - w0) + v0, f(i-1, w - w1) + v1, f(i-1, w - w2) + v2, ..., f(i-1, w - wn) + vn)
// 即每一件物品都算一下其价值，找到最大的那个
// 把f(i, w)写成二维数组，从第一行开始填写这个二维数组即可解
function loop(W, products) {
    // 行数变为可能放到背包的最大的物品的数量，现在假设第0件物品最轻
    let n = Math.floor(W / products[0].w)
    // f是计算当第i个物品和容量为W时的最大价值，i是行，W是列
    let f = Array.from({ length: n + 1 }, () => Array.from({ length: W + 1 }, () => 0))
    // 计算每一行的数据
    for (let k = 1; k <= n; k++) {
        for (let w = 0; w <= W; w++) {
            // 计算f[k][w]的最大值
            let max = 0
            for (let i = 0; i < products.length; i++) {
                let p = products[i]
                if (p.w > w && max < f[k - 1][w]) {
                    // 超重，不能选
                    max = f[k - 1][w]
                } else if (p.w <= w && max < f[k - 1][w - p.w] + p.v) {
                    // 不超重
                    max = f[k - 1][w - p.w] + p.v
                }
            }
            f[k][w] = max
        }
    }
    console.table(f)
    return f[n][W]
}

// 思路2：贪心算法
// 应该尽可能先装入性价比（价值/重量）最高的物品，当装不下时，装次高的物品
function greed(W, products) {
    let smallestWeight = Number.MAX_VALUE
    let bestCosts = products.map((p, i) => {
        smallestWeight > p.w && (smallestWeight = p.w)
        return {bestCost: p.v / p.w, i, w:p.w, v: p.v}
    }).sort()
    console.table(bestCosts)
    let value = 0
    while(W >= smallestWeight) {
        for (let i = 0; i < bestCosts.length; i++) {
            // 每次都取性价比最高的可以装下的物品，取到了就可以找下一个物品了，因此直接跳出循环
            if (bestCosts[i].w <= W) {
                W -= bestCosts[i].w
                value += bestCosts[i].v
                break
            }
        }
    }
    return value
}
// test
let W = 20
let products = [{ w: 2, v: 4 }, { w: 3, v: 4 }, { w: 4, v: 5 }, { w: 5, v: 8 }, { w: 9, v: 10 }]
console.log(greed(W, products) === 40)