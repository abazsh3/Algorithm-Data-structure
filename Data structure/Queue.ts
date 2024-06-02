import util from "util";

type QueueItem<T> = {
  value: T;
  next: NullableItem<T>;
  prev: NullableItem<T>;
};

type NullableItem<T> = QueueItem<T> | null;

class QueueItemNode<T> {
  value: T;
  next: NullableItem<T>;
  prev: NullableItem<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue<T> {
  _first: NullableItem<T>;
  _last: NullableItem<T>;
  length: number;

  constructor() {
    this._first = null;
    this._last = null;
    this.length = 0;
  }

  enqueue(value: T) {
    const newLast = new QueueItemNode(value);
    newLast.next = this._last;
    if (this._last) {
      this._last.prev = newLast;
    }

    if (!this._first) {
      this._first = newLast;
    }

    this._last = newLast;

    this.length++;

    return value;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const dequeuedItem = { ...this._first };

    this._first = this._first?.prev || null;
    if (this._first) {
      this._first.next = null;
    }

    this.length--;
    return dequeuedItem;
  }

  isEmpty() {
    return !this.length;
  }

  [util.inspect.custom]() {
    let currentNode: NullableItem<T> = this._last;

    const array = Array.from({ length: this.length }, () => {
      const currentNodeValue = currentNode?.value;
      currentNode = currentNode?.next || null;
      return currentNodeValue;
    });
    return array;
  }
}
