import util from "util";

type LinkedListItem<T> = {
  value: T;
  next: NullableItem<T>;
};

type NullableItem<T> = LinkedListItem<T> | null;

class LinkedNode<T> {
  value: T;
  next: NullableItem<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  _head: LinkedListItem<T>;
  _tail: LinkedListItem<T>;
  length: number;
  constructor(value: T) {
    this._head = {
      value,
      next: null,
    };
    this._tail = this._head;
    this.length = 1;
  }

  append(value: T) {
    const prevTail = this._tail;
    const newTail = new LinkedNode(value);
    this._tail = newTail;
    prevTail.next = this._tail;
    this.length++;
  }

  preppend(value: T) {
    const prevHead = this._head;
    const newHead = new LinkedNode(value);
    newHead.next = prevHead;
    this._head = newHead;
    this.length++;
  }
  find(index: number) {
    let prevNode = this._head;
    if (index === 0) {
      return prevNode;
    } else if (index === this.length - 1) {
      return this._tail;
    }
    if (index < 0 || index > this.length - 1) {
      return undefined;
    }
    for (let i = 1; i < index; i++) {
      if (prevNode.next) prevNode = prevNode.next;
    }
    return prevNode.next;
  }
  insert(index: number, value: T) {
    if (index === 0) {
      this.preppend(value);
    } else if (index === this.length) {
      this.append(value);
    } else if (index > 0 && index < this.length) {
      const prevNode = this.find(index - 1);
      if (!prevNode) throw new Error("Index out of range");
      const nextNode = prevNode.next;
      const newNode = new LinkedNode(value);
      newNode.next = nextNode;
      prevNode.next = newNode;
    } else {
      throw new Error("Index out of range");
    }
    this.length++;
  }

  delete(index: number) {
    if (index === 0 && this._head.next) {
      this._head = this._head.next;
    } else if (index === this.length) {
      const tailPrev = this.find(this.length - 2);
      if (tailPrev) {
        this._tail = tailPrev;
        this._tail.next = null;
      }
    } else if (index > 0 && index < this.length) {
      const prevNode = this.find(index - 1);
      if (!prevNode) throw new Error("Index out of range");
      const nextNode = prevNode?.next?.next || null;
      prevNode.next = nextNode;
    } else {
      throw new Error("Index out of range");
    }
    this.length--;
  }
  reverse() {
    let currenNode: NullableItem<T> = this._head;
    let prevNode: NullableItem<T> = null;
    let nextNode: NullableItem<T> = this._head.next;
    while (currenNode) {
      currenNode.next = prevNode;
      prevNode = currenNode;
      currenNode = nextNode;
      nextNode = nextNode?.next || null;
    }
    const newhead = this._tail;
    this._tail = this._head;
    this._head = newhead;
  }
  [util.inspect.custom]() {
    let currentNode: NullableItem<T> = this._head;

    const array = Array.from({ length: this.length }, () => {
      const currentNodeValue = currentNode?.value;
      currentNode = currentNode?.next || null;
      return currentNodeValue;
    });
    return array;
  }
}
