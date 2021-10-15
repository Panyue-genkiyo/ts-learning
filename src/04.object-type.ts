//object

export {};

//object不仅仅指{},函数等等都算
const obj: object = {};

const obj2: object = function (){

}
const obj3: object = Array;


const obj4: { foo: number, bar: string} = {foo:1, bar:'hello'}; //限制对象类型只用{}


// const obj1: object = 1,2,'ss'

let a: object; //一切对象

a = {};
a = () => {}
a = []

//{} 用来指定对象中可以包含哪些属性 {属性名:属性值....}
let b: {} = {};
// b.name = 'panyue'; //错误

// let c: {name: string} = {}; //错误注意格式严格保持唯一 (多少都不行)

let d: {name: string} = {
    name: 'panyue'
};

let f: { name: string, age?:number } = {
    name: 'panyue' //?表示可选参数
}

let x: {name: string, [key: string]: any}; //任意类型的属性

x = {
    name: 'panyue',
    a:1,
    c:true,
    d:() => {},
    gender: '男'
}

// let d: Function; //单就这么写没什么意义,与d:object差不多
//设置函数结构的类型声明
let ss: (a: number, b: number) => number;

ss = function (n1: number, n2: number) : number {
    return n1 + n2
}

//数组
let df: number[] = [1,23,34,4];
let dssds: Array<number | string> = [2,3,4,45,'dede', 'helo'];



//元组长度固定
//[类型,...]
let t: [string, string] = ['hello','striong'];
t = ["dd","ddd"];

//枚举
//列举所有可能的情况

enum Gender{
    Male,
    FeMale
}

let i : {name: string, gender: Gender} =  {
    name: 'panyue',
    gender: Gender.Male
}

console.log(i.gender === Gender.Male); //true


//&表示同时 ｜表示或
let j: string | number;
let j2: {name: string} & {age: number} //要同时满足

//类型别名
let k = 1 | 2 | 3 | 4 | 5 | 6;

type myType = string;
type OP = 1 | 2 | 3 | 4 | 5 | 6; //提炼出type


type Callback = (data: string) => void;
const fn:Callback = (data: string) => {
   // return 1;
}
fn("hello");

type test = [number, number];

type test2 = string | { text: string };

// let sssss: OP  = 9
