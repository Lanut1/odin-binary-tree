import Node from "./node.mjs";

export default class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  };

  #buildTree(array) {
    if (array.length === 0) return null;

    const set = new Set(array);
    const sortedArray = [...set].sort((a, b) => a - b);
    const rootIndex = Math.floor((sortedArray.length - 1) / 2);
    const rootNode = new Node(sortedArray[rootIndex]);
    rootNode.leftNode = this.#buildTree(sortedArray.slice(0, rootIndex));
    rootNode.rightNode = this.#buildTree(sortedArray.slice(rootIndex + 1));

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

  #insertNode(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value === value) {
      return root;
    }

    if (value > root.value) {
      root.rightNode = this.#insertNode(value, root.rightNode);
    } else {
      root.leftNode = this.#insertNode(value, root.leftNode);
    }

    return root;
  };

  insert(value) {
    this.#insertNode(value);

    if (!this.isBalanced(this.root)) {
      this.rebalance();
    }
  };

  #getSuccessor(node) {
    node = node.rightNode;
    while (node !== null && node.leftNode !== null) {
      node = node.leftNode;
    }

    return node;
  };

  #deleteNode(value, root = this.root) {
    if (root === null) return root;

    if (value > root.value) {
      root.rightNode = this.#deleteNode(value, root.rightNode);
    } else if (value < root.value) {
      root.leftNode = this.#deleteNode(value, root.leftNode);
    } else {
      if (root.leftNode === null) {
        return root.rightNode;
      } else if (root.rightNode === null) {
        return root.leftNode;
      }

      let successor = this.#getSuccessor(root);
      root.value = successor.value;
      root.rightNode = this.#deleteNode(successor.value, root.rightNode);
    }

    return root;
  };

  delete(value) {
    this.#deleteNode(value);

    if (!this.isBalanced(this.root)) {
      this.rebalance();
    }
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

    if (root === null) return null;

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

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Please provide a callback function");

    if (root === null) return null;

    callback(root.value);
    
    if (root.leftNode !== null) {
      this.preOrder(callback, root.leftNode);
    }

    if (root.rightNode !== null) {
      this.preOrder(callback, root.rightNode);
    }
  };

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Please provide a callback function");

    if (root === null) return null;

    if (root.leftNode !== null) {
      this.inOrder(callback, root.leftNode);
    }

    callback(root.value);

    if (root.rightNode !== null) {
      this.inOrder(callback, root.rightNode);
    }
  };

  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Please provide a callback function");

    if (root === null) return null;

    if (root.leftNode !== null) {
      this.postOrder(callback, root.leftNode);
    }

    if (root.rightNode !== null) {
      this.postOrder(callback, root.rightNode);
    }

    callback(root.value);
  };

  height(node) {
    if (node === null) {
      return 0;
    }

    let leftHeight = this.height(node.leftNode);
    let rightHeight = this.height(node.rightNode);
    
    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth(node, currentNode = this.root, counter = 0) {
    if (node === null) {
      return -1;
    }

    if (node.value === currentNode.value) {
      return counter;
    }

    if (node.value > currentNode.value) {
      return this.depth(node, currentNode.rightNode, counter + 1);
    } else {
      return this.depth(node, currentNode.leftNode, counter + 1);
    }
  };

  #checkBalanceHeight(root) {
    if (root === null) return 0;

    let leftHeight = this.#checkBalanceHeight(root.leftNode);
    let rightHight = this.#checkBalanceHeight(root.rightNode);

    if (leftHeight === -1 || rightHight === -1)  return -1;

    if (Math.abs(leftHeight - rightHight) > 1)  return -1;

    return Math.max(leftHeight, rightHight) + 1;
  };  

  isBalanced(root = this.root) {
    if (root === null) return true;

    if (this.#checkBalanceHeight(root) === -1) return false;

	  return true;
  };

  rebalance() {
    const array = [];
    this.inOrder((element) => array.push(element));

    this.root = this.#buildTree(array);
  };
}