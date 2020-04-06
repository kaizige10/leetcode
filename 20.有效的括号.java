import java.util.Stack;

/*
 * @lc app=leetcode.cn id=20 lang=java
 *
 * [20] 有效的括号
 */

// @lc code=start
class Solution {
    public boolean isValid(String string) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i<string.length(); i++) {
            char c = string.charAt(i);
            if (c == '{' || c == '(' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char last = stack.pop();
                if (c == '}' && last != '{') return false;
                if (c == ']' && last != '[') return false;
                if (c == ')' && last != '(') return false;
            }
        }
        return stack.isEmpty();
    }
}
// @lc code=end

