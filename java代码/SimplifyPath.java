import java.util.Stack;

class SimplifyPath {
    public String simplifyPath(String path) {
        String[] pathArr = path.split("/");
        Stack<String> stack = new Stack<>();
        for (int i = 0; i < pathArr.length; i++) {
            if (pathArr[i].equals(".") || pathArr[i].equals("")) {
                continue;
            } else if (pathArr[i].equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(pathArr[i]);
            }
        }
        if (stack.isEmpty()) {
            return "/";
        } else {
            StringBuilder sb = new StringBuilder();
            int i = 0;
            while(i < stack.size()) {
                sb.append("/");
                sb.append(stack.get(i++));
            }
            return sb.toString();
        }
    }

    public static void main(String[] args) {
        SimplifyPath s = new SimplifyPath();
        String ans = s.simplifyPath("/home/");
        System.out.println(ans);
    }
}