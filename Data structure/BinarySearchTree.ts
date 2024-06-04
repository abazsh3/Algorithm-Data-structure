type TreeItem<T> = {
  value: T;
  right: NullableItem<T>;
  left: NullableItem<T>;
};

type NullableItem<T> = TreeItem<T> | null;

class TreeNode<T> {
  value: T;
  right: NullableItem<T>;
  left: NullableItem<T>;
  constructor(value: T) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree<T> {
  root: NullableItem<T>;
  constructor() {
    this.root = null;
  }

  insert(value: T) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return value;
    }

    let currentNode = this.root;
    while (true) {
      if (currentNode.value > value) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = newNode;
          break;
        }
      } else {
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = newNode;
          break;
        }
      }
    }
    return value;
  }
  lookup(value: T) {
    if (!this.root) return undefined;
    let currentNode: NullableItem<T> = this.root;
    while (currentNode) {
      if (currentNode.value === value) {
        break;
      }

      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  remove(value: T) {
    if (!this.root) {
      return undefined;
    }
    let parentNode: NullableItem<T> = null;
    let currentNode: NullableItem<T> = this.root;
    while (currentNode) {
      if (currentNode.value > value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        if (!currentNode.right) {
          if (!parentNode) {
            this.root = currentNode.left;
            return currentNode;
          } else {
            if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            } else {
              parentNode.left = currentNode.left;
            }
            return currentNode;
          }
        } else {
          let successorParent = currentNode;
          let successor = currentNode.right;

          while (successor?.left) {
            successorParent = successor;
            successor = successor.left;
          }
          if (successorParent.value !== currentNode.value) {
            successorParent.left = null;
            successor.right = currentNode.right;
          }
          if (parentNode && currentNode.value > parentNode.value) {
            parentNode.right = successor;
          } else if (parentNode) {
            parentNode.left = successor;
          } else {
            this.root = successor;
          }

          successor.left = currentNode.left;
          return currentNode;
        }
      }
    }
  }
}
