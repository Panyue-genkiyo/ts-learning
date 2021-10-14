/**
 * 元组类型
 * 元组:大小和每一个元素的类型都确定的数组
 */


export {}

const turple: [number, string] = [1,'hello'];

// const age = turple[0];
const [ age,  msg ] = turple;

console.log(age, msg);

// Object.entries({
//     foo:'1',
//     hello: 1
// });
