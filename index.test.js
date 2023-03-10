const LinkedList = require("./index");

describe("Class LinkedList:", () => {
  let list = new LinkedList();

  beforeEach(() => {
    list = new LinkedList();
    list.append("a");
    list.append("b");
    list.append("c");
  });

  test("length() should return correct list length", () => {
    expect(list.length()).toBe(3);
  });

  test("append() should add a new element", () => {
    list.append("d");
    expect(list.get(3).data).toBe("d");
  });

  test("insert() should insert a new element in the right place", () => {
    list.insert("helloInsert", 2);
    expect(list.get(2).data).toBe("helloInsert");
    list.insert("helloInsert", 0);
    expect(list.get(0).data).toBe("helloInsert");
  });

  test("insert() should throw an error when incorrect index is passed as a parameter", () => {
    const attempt1 = () => list.insert("helloInsert", -1);
    expect(attempt1).toThrow("Incorrect index");
    const attempt2 = () => list.insert("helloInsert", 10);
    expect(attempt2).toThrow("Incorrect index");
  });

  test("delete() should delete and return an element", () => {
    list.append("d");
    const deletedElem1 = list.delete(2);
    expect(deletedElem1.data).toBe("c");
    expect(list.get(2).data).toBe("d");
    const deletedElem2 = list.delete(0);
    expect(deletedElem2.data).toBe("a");
    expect(list.get(0).data).toBe("b");
    list.clear();
    list.append("a");
    const deletedElem3 = list.delete(0);
    expect(deletedElem3.data).toBe("a");
  });

  test("delete() should throw an error when incorrect index is passed as a parameter", () => {
    const attempt1 = () => list.delete(-1);
    expect(attempt1).toThrow("Incorrect index");
    const attempt2 = () => list.delete(10);
    expect(attempt2).toThrow("Incorrect index");
  });

  test("deleteAll() should delete all elements with a specified data", () => {
    list.append("f");
    list.append("d");
    list.append("f");
    list.deleteAll("f");
    expect(list.toArray()).not.toContain({ data: "f" });
  });

  test("get() should return correct element by the id", () => {
    expect(list.get(0).data).toBe("a");
    expect(list.get(1).data).toBe("b");
    expect(list.get(2).data).toBe("c");
  });

  test("get() should throw an error when incorrect index is passed as a parameter", () => {
    const attempt1 = () => list.get(-1);
    expect(attempt1).toThrow("Incorrect index");
    const attempt2 = () => list.get(10);
    expect(attempt2).toThrow("Incorrect index");
  });

  test("clone() should return cloned list", () => {
    expect(list.clone().toArray()).toEqual(list.toArray());
    list.clear();
    expect(list.clone().toArray()).toEqual(list.toArray());
    list.append("a");
    expect(list.clone().toArray()).toEqual(list.toArray());
  });

  test("clone() should return copy of the list that doesn't affect the original one", () => {
    const clonedList = list.clone();
    clonedList.append("d");
    expect(list.toArray()).not.toContain({ data: "d" });
  });

  test("reverse() should return reversed list", () => {
    const originalOrder = list.toArray().map((elem) => elem.data);
    list.reverse();
    const reversedOrder = list.toArray().map((elem) => elem.data);
    expect(originalOrder.reverse()).toEqual(reversedOrder);
  });

  test("findFirst() should return the first found element", () => {
    list.append("a");
    expect(list.findFirst("a")).toBe(0);
  });

  test("findFirst() should return -1 when found no elements", () => {
    expect(list.findFirst("hello")).toBe(-1);
  });

  test("findLast() should return the last found element", () => {
    list.append("a");
    expect(list.findLast("a")).toBe(3);
  });

  test("findLast() should return -1 when found no elements", () => {
    expect(list.findLast("hello")).toBe(-1);
  });

  test("clear() should delete all elements in the list", () => {
    list.clear();
    expect(list.toArray().length).toBe(0);
  });

  test("extend() should extend the list with another list passed as a parameter", () => {
    const list2 = new LinkedList();
    list2.append("d");
    list2.append("e");
    list2.append("f");
    list.extend(list2);
    expect(list.findFirst("d")).toBe(3);
    expect(list.findFirst("e")).toBe(4);
    expect(list.findFirst("f")).toBe(5);
  });

  test("toArray() should convert the list into array and return it", () => {
    const mapped1 = list.toArray().map((elem) => elem.data);
    expect(mapped1).toEqual(["a", "b", "c"]);
    list.clear();
    expect(list.toArray()).toEqual([]);
    list.append("a");
    const mapped2 = list.toArray().map((elem) => elem.data);
    expect(mapped2).toEqual(["a"]);
  });
});