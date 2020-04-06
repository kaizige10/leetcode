

class Node {
    int val;
    Node next;
    public Node(int val, Node next) {
        this.val = val;
        this.next = next;
    }
}

class LastRemaining {
    public int lastRemaining(int n, int m) {
        Node last = new Node(n-1, null);

        Node[] nodelist = new Node[n];
        nodelist[n-1] = last;

        for (int i = n-2; i >= 0; i--) {
            Node nextNode = nodelist[i+1];
            Node cur = new Node(i, nextNode);
            nodelist[i] = cur;
        }
        Node first = nodelist[0];
        last.next = first;
        return 0;
    }

}