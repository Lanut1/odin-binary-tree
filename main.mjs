import Tree from "./tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 324];
const tree = new Tree(array);
tree.prettyPrint(tree.root);

console.log(tree.isBalanced());
const levelOrderArray = [];
const preOrderArray = [];
const inOrderArray = [];
const postOrderArray = [];

tree.levelOrder((element) => levelOrderArray.push(element));
tree.preOrder((element) => preOrderArray.push(element));
tree.inOrder((element) => inOrderArray.push(element));
tree.postOrder((element) => postOrderArray.push(element));

console.log(levelOrderArray);
console.log(preOrderArray);
console.log(inOrderArray);
console.log(postOrderArray);

tree.insert(88);
tree.insert(543);

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.insert(343);
tree.insert(15);
tree.insert(85);
tree.insert(100);

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.delete(15);
tree.delete(555);

tree.prettyPrint(tree.root);

