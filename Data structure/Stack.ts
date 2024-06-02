import util from "util";

type StackItem<T> = {
  value: T;
  next: NullableItem<T>;
};

type NullableItem<T> = StackItem<T> | null;

class StackNode<T> {
  value: T;
  next: NullableItem<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Stack<T> {
  _top: NullableItem<T>;
  _bottom: NullableItem<T>;
  length: number;

  constructor() {
    this._top = null;
    this._bottom = null;
    this.length = 0;
  }

  push(value: T) {
    const newNode = new StackNode(value);
    if (!this._bottom) {
      this._bottom = newNode;
    }
    newNode.next = this._top;
    this._top = newNode;
    this.length++;
    return value;
  }
  pop() {
    if (!this.length) {
      return undefined;
    }
    const newTop = this._top?.next || null;
    if (!newTop) {
      this._bottom = null;
    }
    const poppedValue = this._top?.value;
    this._top = newTop;
    this.length--;
    return poppedValue;
  }
  peek() {
    return this._top?.value;
  }
  isEmpty() {
    return !this.length;
  }
  [util.inspect.custom]() {
    let currentNode: NullableItem<T> = this._top;

    const array = Array.from({ length: this.length }, () => {
      const currentNodeValue = currentNode?.value;
      currentNode = currentNode?.next || null;
      return currentNodeValue;
    });
    return array;
  }
}
