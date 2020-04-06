import java.util.ArrayList;
import java.util.List;

class ClimbStairs {
    /**
     * 递归写法
     */
    public int climbStairs1(int n) {
        if (n==1) return 1;
        if (n==2) return 2;
        return climbStairs1(n-1) + climbStairs1(n-2);
    }

    /**
     * 缓存写法
     */
    public int climbStairs2(int n) {
        List<Integer> memo = new ArrayList<>(100);
        memo.add(0);
        memo.add(1);
        memo.add(2);
        if (n<=2) return memo.get(n);
        
        for (int i = 3; i <= n; i++) {
            memo.add(memo.get(i-1) + memo.get(i-2));
        }
        return memo.get(n);
    }

    public int climbStairs(int n) {
        if (n<=2) return n;
        int prevprev = 1;
        int prev = 2;
        for(int i=3;i<=n;i++) {
            int temp = prevprev;
            prevprev = prev;
            prev = temp + prev;
        }
        return prev;
    }

    public static void main(String[] args) {
        ClimbStairs c = new ClimbStairs();
        System.out.println(c.climbStairs(3));
        System.out.println(c.climbStairs(4));
        System.out.println(c.climbStairs(5));
        
    }
}