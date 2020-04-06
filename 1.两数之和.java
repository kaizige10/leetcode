
/*
 * @lc app=leetcode.cn id=1 lang=java
 *
 * [1] 两数之和
 */

// @lc code=start
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i=0; i<nums.length; i++) {
            Integer need = map.get(target - nums[i]);
            if (need != null) {
                int[] res = {need, i};
                return res;
            } else {
                map.put(nums[i], i);
            }
        }
        return new int[2];
    }

}
// @lc code=end

