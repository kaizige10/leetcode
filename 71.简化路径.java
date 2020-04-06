import java.util.Stack;

/*
 * @lc app=leetcode.cn id=71 lang=java
 *
 * [71] 简化路径
 */

// @lc code=start
class Solution {
    public String simplifyPath(String path) {
        String[] pathArr = path.split("/");
        Stack<String> stack = new Stack<>();
        for (int i = 0; i < pathArr.length; i++) {
            if (pathArr[i] == "." || pathArr[i] == "") {
                continue;
            } else if (pathArr[i] == "..") {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(pathArr[i]);
            }
        }
        String ans = "";
        while (!stack.isEmpty()) {
            ans = "/" + stack.pop() + ans;
        }
        return ans;
    }

}
// @lc code=end

