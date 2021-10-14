//object

export {};

//object不仅仅指{},函数等等都算
const obj: object = {};

const obj2: object = function (){

}
const obj3: object = Array;


const obj4: { foo: number, bar: string} = {foo:1, bar:'hello'}; //限制对象类型只用{}



// const obj1: object = 1,2,'ss'
