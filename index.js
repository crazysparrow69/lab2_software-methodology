class Node {
  constructor(data) {
    this.data = data;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  length() {
    if (!this.tail) {
      return 0;
    }

    return this.tail.index + 1;
  }

  append(data) {
    if (typeof data !== "string") return;

    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      node.index = 0;
    }

    if (this.tail) {
      this.tail.next = node;
      node.index = this.tail.index + 1;
    }

    if (this.length() > 1) {
      node.next = this.head;
    }

    this.tail = node;
  }

  insert(data, index) {
    if (index < 0 || index > this.tail.index) {
      throw new Error("Incorrect index");
    }

    const node = new Node(data);

    if (index === 0) {
      node.next = this.head;
      node.index = 0;
      this.head = node;
      this.tail.next = this.head;
    } else {
      const found = this.get(index - 1);
      node.next = found.next;
      found.next = node;
      node.index = found.index + 1;
    }

    this.#correctIndex(node.next);
  }

  delete(index) {
    if (index < 0 || index > this.tail.index || typeof(index) !== "number") {
      throw new Error("Incorrect index");
    }

    let deletedElem = null;

    if (this.length() === 0) {
      return;
    } else if (this.length() === 1) {
      deletedElem = this.head;
      this.head = null;
      this.tail = null;
    } else {
      deletedElem = this.get(index);

      if (deletedElem.index === 0) {
        this.head = deletedElem.next;
        this.tail.next = this.head;

        this.#correctIndex(this.head, "decreasing");
      } else if (deletedElem.index === this.tail.index) {
        const prevElem = this.get(index - 1);
        prevElem.next = this.head;
      } else {
        const prevElem = this.get(index - 1);
        const nextElem = this.get(index + 1);
        prevElem.next = nextElem;
  
        this.#correctIndex(nextElem, "decreasing");
      }
    }

    return deletedElem;
  }

  deleteAll(data) {
    if (typeof data !== "string" || this.length() === 0) {
      return;
    } else if (this.length() === 1) {
      if (this.head.data === data) {
        this.delete(this.head.index);
      }
    } else {
      let current = this.head;
      let index = 0;
      while (current.index >= index) {
        if (current.data === data) {
          this.delete(current.index);
        }
  
        index = current.index;
        current = current.next;
      }
    }
  }

  get(index) {
    if (index < 0 || index > this.tail.index || this.length() === 0 ) {
      throw new Error("Incorrect index");
    } else if (this.length() === 1) {
        return this.head;
    } else {
      let current = this.head;
      let i = 0;
      while (current.index >= i) {
        if (current.index === index) {
          return current;
        }
        i = current.index;
        current = current.next;
      }
    }
  }

  clone() {
    const clonedList = new LinkedList();

    if (this.length() === 1) {
      clonedList.append(this.head.data);
    } else if (this.length() > 1) {
      let current = this.head;
      let index = 0;
      while (current.index >= index) {
        clonedList.append(current.data);
        index = current.index;
        current = current.next;
      }
    }

    return clonedList;
  }

  reverse() {
    if (this.length() < 2) return;

    const length = this.length();
    for (let i = 0; i < length - 1; i++) {
      this.insert(this.delete(this.tail.index).data, i);
    }
  }

  findFirst(data) {
    if (typeof data !== "string") return;

    let current = this.head;
    let index = 0;

    while (current.index >= index) {
      if (current.data === data) {
        return current.index;
      }
      index = current.index;
      current = current.next;
    }

    return -1;
  }

  findLast(data) {
    let current = this.head;
    let index = 0;
    let foundElementIndex = null;

    while (current.index >= index) {
      if (current.data === data) {
        foundElementIndex = current.index;
      }

      index = current.index;
      current = current.next;
    }

    if (!foundElementIndex) {
      return -1;
    } else {
      return foundElementIndex;
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
  }

  extend(list) {
    let current = list.head;
    let index = 0;

    while (current.index >= index) {
      this.append(current.data);
      index = current.index;
      current = current.next;
    }
  }

  toArray() {
    const output = [];

    if (this.length() === 1) {
      output.push(this.head);
    } else if (this.length() > 1) {
      let current = this.head;
      let index = 0;

      while (current.index >= index) {
        output.push(current);
        index = current.index;
        current = current.next;
      }
    }
    
    return output;
  }

  #correctIndex(startElem, order = "increasing") {
    let current = startElem;
    let i = 0;

    if (order === "increasing") {
      while (current.index >= i) {
        current.index++;
        i = current.index;
        current = current.next;
      }
    } else if (order === "decreasing") {
      while (current.index >= i) {
        current.index--;
        i = current.index;
        current = current.next;
      }
    } else {
      return;
    }
  }
}

module.exports = LinkedList;

//// DEMONSTRATION OF USING METHODS

// append()
const list = new LinkedList();
list.append("a"); // ["a"]
list.append("b"); // ["a", "b"]
list.append("c"); // ["a", "b", "c"]
list.append("d"); // ["a", "b", "c", "d"]
list.append("e"); // ["a", "b", "c", "d", "e"]
console.log(list.toArray());

// length()
console.log("list length: ", list.length()); // 5

// insert() and get()
list.insert("f", 1); // ["a", "f", "b", "c", "d", "e"]
list.insert("f", 3); // ["a", "f", "b", "f", "c", "d", "e"]
console.log(list.get(1)); // "f"
console.log(list.get(3)); // "f"

// delete()
list.delete(0); // ["f", "b", "f", "c", "d", "e"]
console.log(list.get(0)); // "f"

// deleteAll()
list.deleteAll("f"); // ["b", "c", "d", "e"]
console.log(list.toArray());

// clone()
const clonedList = list.clone(); // ["b", "c", "d", "e"]
console.log(clonedList.toArray());

// findFirst() and findLast()
clonedList.append("f"); // ["b", "c", "d", "e", "f"]
clonedList.append("f"); // ["b", "c", "d", "e", "f", "f"]
console.log("first 'f' in clonedList:", clonedList.findFirst("f"));
console.log("last 'f' in clonedList:", clonedList.findLast("f"));

// extend()
clonedList.extend(list); // ["b", "c", "d", "e", "f", "f", "b", "c", "d", "e"]
console.log(clonedList.toArray());

// reverse()
console.log( "starting list: " ,list.toArray());  // ["b", "c", "d", "e"]
list.reverse();
console.log( "resulting list: " ,list.toArray());  // ["e", "d", "c", "b"]

// clear()
clonedList.clear();
console.log(clonedList.toArray());

// compare list and cloned list
console.log(list.toArray());
console.log(clonedList.toArray());