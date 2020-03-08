// 有n种物品和一个容量为W的背包，第i种物品的重量是w[i]，价值是v[i]。求解将哪些物品装入背包可使这些物品的费用总和不超过背包容量，且价值总和最大。
// 比如如下物品(每个物品的信息为[w, v])：[[2, 3], [3,4], [4,5], [5,8], [9,10]],背包容量为20，选择第0,2,3,4的物品时价值最大，为26


function backpack01(W, products) {
    // let t = recur(W, products, products.length - 1)
    let t = loop(W, products)

    return t
}

// 思路1：递归
// 递归的公式是： f(i, w) = max(f(i-1, w), f(i-1, w - wi) + vi)
// 意思就是前i件（重w时）的最大价值等于二选一的更大值：一是不选择i物品f(i-1, w), 二是选择i物品f(i-1, w - wi) + vi
// 当选择i物品时，重量超过了W，那么就只能放弃i，只能选择f(i-1, w)
// 递归的出口是0
function recur(W, products, i) {
    if (i === 0) {
        if (products[i] > W) return 0
        return products[i].v
    } else {
        if (W - products[i].w < 0) {
            // 如果超重了，就不选
            return recur(W, products, i - 1)
        } else {
            // 选择和不选择，比较哪个更优
            let pick = recur(W - products[i].w, products, i - 1) + products[i].v
            let notPick = recur(W, products, i - 1)
            return Math.max(pick, notPick)
        }
    }
}

// 思路2：递推（循环）
// 递归的公式是： f(i, w) = max(f(i-1, w), f(i-1, w - wi) + vi)
// 把f(i, w)写成二维数组，从第一行开始填写这个二维数组即可解
function loop1(W, products) {
    let n = products.length
    // f是计算当第i个物品和容量为W时的最大价值，i是行，W是列
    let f = Array.from({ length: n + 1 }, () => Array.from({ length: W + 1 }, () => 0))
    // 计算每一行的数据
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            if (w < products[i - 1].w) {
                f[i][w] = f[i - 1][w]
            } else {
                let pick = f[i - 1][w - products[i - 1].w] + products[i - 1].v
                let notPick = f[i - 1][w]
                f[i][w] = Math.max(pick, notPick)
            }
        }
    }
    // console.table(f)
    return f[n][W]
}

// 思路3：优化递推（循环）
// 只使用一维数组来保存中间状态
function loop(W, products) {
    let n = products.length
    // f是计算当第i个物品和容量为W时的最大价值
    let f = Array.from({ length: W + 1 }, () => 0)
    // 计算每一件物品的解
    for (let i = 1; i <= n; i++) {
        // w从后面往前走，这样可以避免f数组的冲突问题
        for (let w = W; w >= 0; w--) {
            if (w >= products[i - 1].w) {
                let pick = f[w - products[i - 1].w] + products[i - 1].v
                let notPick = f[w]
                f[w] = Math.max(pick, notPick)
            }
        }
        // console.log(f);
    }
    return f[W]
}

// test
console.log(backpack01(20, [{ w: 2, v: 3 }, { w: 3, v: 4 }, { w: 4, v: 5 }, { w: 5, v: 8 }, { w: 9, v: 10 }]) === 26)
// console.log(backpack01(6, [{ w: 3, v: 10 }, { w: 1, v: 3 }, { w: 2, v: 9 }, { w: 2, v: 5 }, { w: 1, v: 6 }]) === 25)