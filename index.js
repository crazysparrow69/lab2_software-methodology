class Node {
  constructor(data) {
    this.data = data;
  }
}

class LinkedList {
  #storage = [];

  length() {
    return this.#storage.length;
  }

  append(data) {
    const node = new Node(data);
    this.#storage.push(node);
  }

  insert(data, index) {
    if (index < 0 || this.#storage[index] === undefined) {
      throw new Error('Incorrect index');
    }

    const node = new Node(data);
    this.#storage.splice(index, 0, node);
  }

  delete(index) {
    if (index < 0 || this.#storage[index] === undefined) {
      throw new Error('Incorrect index');
    }

    const elem = this.get(index);
    this.#storage.splice(index, 1);
    return elem;
  }

  deleteAll(data) {
    for (let i = 0; i < this.length(); i++) {
      if (this.#storage[i].data === data) {
        this.delete(i);
      }
    }
  }

  get(index) {
    if (index < 0 || this.#storage[index] === undefined) {
      throw new Error('Incorrect index');
    }
    return this.#storage[index];
  }

  clone() {
    const clonedList = new LinkedList();
    for (const elem of this.#storage) {
      clonedList.append(elem.data);
    }
    return clonedList;
  }

  reverse() {
    this.#storage.reverse();
  }

  findFirst(data) {
    for (let i = 0; i < this.length(); i++) {
      if (this.#storage[i].data === data) {
        return i;
      }
    }
    return -1;
  }

  findLast(data) {
    for (let i = this.length() - 1; i >= 0; i--) {
      if (this.#storage[i].data === data) {
        return i;
      }
    }
    return -1;
  }

  clear() {
    this.#storage.splice(0, this.length());
  }

  extend(list) {
    for (const elem of list.toArray()) {
      this.#storage.push(elem);
    }
  }

  toArray() {
    return this.#storage;
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