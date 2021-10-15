/**
 * 原始
 */

export {}

const a: string = "hello";
const b: number = 1; //number包含NaN和infinity

const c: boolean = true //true or false

//strictNullChecks为true的情况下，这个就会报错
//const d: string = null; //在严格模式下，string, number, boolean都可以为null或者undefined

const e: void = undefined; //一般用在函数返回值 null或者undefined 在严格模式下只能undefind

const f: null = null; //strict:false ==> null or undefined ||  true => null

const g: undefined = undefined; //同上

const h: symbol = Symbol(); //es2015(es6)标准库中才存在Symbol

//字面量赋值
//联合；类型
let test: 'hello' | 'string'; //只能这两个值

test = 'hello';

test = "string"

let test1: any;  //相当于关闭类型检查 any很少用 声明变量不手动赋值，则ts会隐士类型判断为any

test1 = 'hello'
test1 = true
test1 = () => { return 'hello' }

// unknow
//未知类型的值
let test3: unknown
test3 = 10;
test3 = 'hello';
test3 = () => console.log('hello');

let s: string = test1;  //any 可以赋给任意类型变量

// let de: string = test3; // unknow不能轻易赋值 就是一个类型安全的any
//unknow类型的变量不能赋值给其他变量

if(typeof test3 === 'string'){
    s = test3; //解决unknow的第一种方法
}
//类型断言
s = test3 as string; //告诉编译器test3就是字符串
s = <string>test3; //类型断言的另一种写法

//void and never
function fn(): number{
    return 113;
}

function fn1(num : number):true | number{
    if(num > 0) return true;
    else return -1
}

function fn2():void {
    console.log('hello');

    //return undefined // undefined  ok return;
    // return null; //严格下不行
}

//never永远不会返回结果
//并不包含undefined和null

function fn3(): never{
  throw new Error('hello'); //报错使用never
}


