import Node from "./node.mjs";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const set = new Set(array);
    const sortedArray = [...set].sort((a, b) => a - b);
    const rootIndex = Math.floor((sortedArray.length - 1) / 2);
    const rootNode = new Node(sortedArray[rootIndex]);
    rootNode.leftNode = this.buildTree(sortedArray.slice(0, rootIndex));
    rootNode.rightNode = this.buildTree(sortedArray.slice(rootIndex + 1));

    return rootNode;
  };

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftNode !== null) {
      this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value === value) {
      return root;
    }

    if (value > root.value) {
      root.rightNode = this.insert(value, root.rightNode);
    } else {
      root.leftNode = this.insert(value, root.leftNode);
    }

    return root;
  };

  getSuccessor(node) {
    node = node.rightNode;
    while (node !== null && node.leftNode !== null) {
      node = node.leftNode;
    }

    return node;
  };

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value > root.value) {
      root.rightNode = this.delete(value, root.rightNode);
    } else if (value < root.value) {
      root.leftNode = this.delete(value, root.leftNode);
    } else {
      if (root.leftNode === null) {
        return root.rightNode;
      } else if (root.rightNode === null) {
        return root.leftNode;
      }

      let successor = this.getSuccessor(root);
      root.value = successor.value;
      root.rightNode = this.delete(successor.value, root.rightNode);
    }

    return root;
  };

  find(value, root = this.root) {
    if (root === null || root.value === value) {
      return root;
    }

    if (value > root.value) {
      return this.find(value, root.rightNode);
    } else {
      return this.find(value, root.leftNode);
    }
  };

  levelOrder(callback, root = this.root) {
    if (!callback) throw new Error("Please provide a callback function");

    if (root === null) return;

    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.value);

      if (node.leftNode !== null) {
        queue.push(node.leftNode);
      }

      if (node.rightNode !== null) {
        queue.push(node.rightNode);
      }
    }
  };

  // inOrder(callback, root = this.root) {

  // }
}