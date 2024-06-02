import util from "util";

type QueueItem<T> = {
  value: T;
  next: NullableItem<T>;
};

type NullableItem<T> = QueueItem<T> | null;

class QueueItemNode<T> {
  value: T;
  next: NullableItem<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
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

    if (this._last) {
      this._last.next = newLast;
    }

    this._last = newLast;

    if (this.isEmpty()) {
      this._first = this._last;
    }

    this.length++;

    return value;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const dequeuedItem = this._first;

    const newFirst = this._first!.next;

    this._first = newFirst;

    this.length--;
    return dequeuedItem?.value;
  }

  isEmpty() {
    return !this.length;
  }

  [util.inspect.custom]() {
    let currentNode: NullableItem<T> = this._first;

    const array = Array.from({ length: this.length }, () => {
      const currentNodeValue = currentNode?.value;
      currentNode = currentNode?.next || null;
      return currentNodeValue;
    });
    return array;
  }
}
