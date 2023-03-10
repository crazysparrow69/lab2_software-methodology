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