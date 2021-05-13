class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.next = null;             
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }

    size() {
        let count = 0; 
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }
    
    clear() {
        this.head = null;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }

    getFirst() {
        return this.head;
    }

    // Insère les informations de façon croissante
    insert(id, data) {
        let node = this.head;
        let last = null;
        let newNode = new Node(id, data);
        while (node && node.id < id) {
            last = node;
            node = node.next;
        }

        if (node) newNode.next = node;
        
        if (last == null) this.head = newNode;
        else last.next = newNode;
    }

    display() {
        let node = this.head;
        let text = "[";
        while (node) {
            text += node.id + ": " + JSON.stringify(node.data);
            if (node.next)
                text += ", ";

            node = node.next;
        }
        console.log(text + "]");
    }
}