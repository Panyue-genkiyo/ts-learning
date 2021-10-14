/**
 * 原始
 */

const a: string = "hello";
const b: number = 1; //number包含NaN和infinity

const c: boolean = true //true or false

//strictNullChecks为true的情况下，这个就会报错
//const d: string = null; //在严格模式下，string, number, boolean都可以为null或者undefined

const e: void = undefined; //一般用在函数返回值 null或者undefined 在严格模式下只能undefind

const f: null = null; //strict:false ==> null or undefined ||  true => null

const g: undefined = undefined; //同上

const h: symbol = Symbol(); //es2015(es6)标准库中才存在Symbol



