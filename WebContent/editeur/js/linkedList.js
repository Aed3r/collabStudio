class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.next = null;
    }

    compare(node) {
        if (this.id != node.id) return false

        Object.entries(node.data).forEach(([key, value]) => {
            if (!this.data[key] || this.data[key] != value) return false;
        });

        return true;
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
    // Renvoie le noeud créé
    // sortFunc est une fonction de comparaison optionnelle permettant de trier les éléments ajoutés au fur et à mesure
    insert(id, data, sortFunc = null) {
        let node = this.head;
        let last = null;
        let newNode = new Node(id, data);

        if (sortFunc) {
            while (node && sortFunc(node, newNode)) {
                last = node;
                node = node.next;
            }

            if (node) newNode.next = node;

            if (last == null) this.head = newNode;
            else last.next = newNode;
        } else { 
            if (this.head)
                this.getLast().next = newNode;
            else
                this.head = newNode;
        }

        return newNode;
    }

    // Affiche la liste dans la console
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

    // Renvoie l'objet Node de temps time, ou le plus proche avant time s'il n'existe pas
    // comp la fonction permettant de comparer les paramètres
    // filtre une fonction de filtration de noeuds optionnelle
    getClosestBeforeOrOn(comp, filtre = null) {
        let node = this.head;
        let current = null;
        let last = null;

        if (filtre) {
            if (node && filtre(node))
                current = node;
        } else current = node;

        while (node && comp(node)) {
            node = node.next;

            if (filtre) {
                if (node) {
                    if (filtre(node)) {
                        last = current;
                        current = node;
                    }
                } else {
                    last = current;
                    current = null;
                }
            } else {
                last = current;
                current = node;
            }
        }

        if (current && comp(current)) return current;
        else return last;
    }

    // Renvoie l'objet Node le plus proche strictement après time, s'il existe
    // comp la fonction permettant de comparer les paramètres
    // filtre une fonction de filtration de noeuds optionnelle
    getClosestAfter(comp, filtre = null) {
        let node = this.head;
        let current = null;

        if (filtre) {
            while (node && !filtre(node)) {
                node = node.next;
            }
            current = node;
        } else current = node;

        while (current && comp(current)) {
            node = node.next;

            if (filtre) {
                if (node) {
                    if (filtre(node)) current = node;
                } else current = null;
            } else current = node;
        }

        return current;
    }

    // Supprime le noeud d'indentifiant id 
    remove(id) {
        let node = this.head;
        let last = null;

        while (node && node.id != id) {
            last = node;
            node = node.next;
        }

        if (node && node.id == id) {
            if (last) last.next = node.next;
            else this.head = node.next;
        }
    }

    // Renvoie le noeud d'identifiant id ou null
    get(id) {
        let node = this.head;

        while (node && node.id != id) {
            node = node.next;
        }

        return node;
    }
}