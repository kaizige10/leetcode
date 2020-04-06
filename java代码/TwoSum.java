import java.util.Arrays;
import java.util.HashMap;

class TwoSum {
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
    public static void main(String[] args) {
        TwoSum s = new TwoSum();
        int[] nums = {2,7,11,15};
        System.out.println(Arrays.toString(s.twoSum(nums, 9)));
    }
}