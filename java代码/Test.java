import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

/**
 * Test
 */
public class Test {

    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("kai", 3);
        map.put("ding", 6);
        // System.out.println(map.containsKey("kai"));
        // System.out.println(map.containsKey("kai12"));
        // System.out.println(map);
        
        // for (Entry<String, Integer> entry : map.entrySet()) {
        //     System.out.println(entry.getKey() + ' ' + entry.getValue().toString());
        // }

        map.forEach((k, v) -> {
            System.out.println(k + v);
        });
    }
}