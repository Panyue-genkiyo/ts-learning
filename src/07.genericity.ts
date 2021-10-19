//泛型
export {}

///检查对象上的键是否存在 keyof

interface Person{
   name: string,
   age: number,
   location:  string
}

type K1 = keyof Person;  //联合类型 name | age | location
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string | number

/**
 * 通过 keyof 操作符，我们就可以获取指定类型的所有键，
 * 之后我们就可以结合前面介绍的 extends 约束，即限制输入的属性名包含在 keyof 返回的联合类型中。
 * 具体的使用方式如下：
 */

//k只能是T的键注意
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key];
}

enum Difficulty{
    Easy,
    Medium,
    Hard
}

let tsInfo = {
    name: "Typescript",
    supersetOf: "Javascript",
    difficulty: Difficulty.Medium,
    easy: 0
}

let diff: Difficulty = getProperty(tsInfo, "difficulty"); //这里的k只能是name,supersetOf, difficulty, easy
let easy: Difficulty = getProperty(tsInfo, "easy")
// let name: Difficulty = getProperty(tsInfo, "name"); //错误，编译错误，字符串不能赋给枚举
console.log(diff); //1
console.log(easy); //0
console.log(Difficulty[easy]); //Easy

//泛型默认参数
/**
 *  有默认类型的类型参数被认为是可选的。
 必选的类型参数不能在可选的类型参数后。
 如果类型参数有约束，类型参数的默认类型必须满足这个约束。
 当指定类型实参时，你只需要指定必选类型参数的类型实参。 未指定的类型参数会被解析为它们的默认类型。
 如果指定了默认类型，且类型推断无法选择一个候选类型，那么将使用默认类型作为推断结果。
 一个被现有类或接口合并的类或者接口的声明可以为现有类型参数引入默认类型。
 一个被现有类或接口合并的类或者接口的声明可以引入新的类型参数，只要它指定了默认类型。
 */
interface A<T=string> {
    name: T
}

const a1: A = {
    name: "string test"
}

const a2: A<Number> = {
    name: 1204
}



//泛型条件类型
interface Dictionary<T = any>{
    [prop: string]: T
}

/**
 * 在 TypeScript 中，never 类型表示的是那些永不存在的值的类型。
 * 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
 * any不能赋给never
 */


type StrDict = Dictionary<string>;
type  DictMember<T> = T extends Dictionary<infer V> ? V: never;
type StrDictMember = DictMember<StrDict>

//Partial
interface ITodo{
    title: string,
    description: string
}

function updateTodo(todo: ITodo, filedsUpdateTodo: Partial<ITodo>):ITodo{
    //Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
    return {
        ...todo,
        ...filedsUpdateTodo
    }
}

updateTodo({
    title: 'hello',
    description: 'none'
}, {
    title: 'updateTodo'
})

//Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
interface PageInfo{
    title: string
}

type Page = "about" | "home" | "concat"

const x: Record<Page, PageInfo> = {
    about: {
        title: 'about'
    },
    home: {
        title: 'home'
    },
    concat:{
        title: 'concat'
    }
}

//Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

interface l1{
    name: string,
    age: number,
    phone: number,
    grade: string
}

// keyof T "name" | "age" | "phone" | "grade"

const test: Pick<l1,"name" | "phone"> = {
    name: 'hello',
    phone: 88888
}

//Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
type t1 = Exclude<"name" | "age" , "age">; //"name"
type t2 = Exclude<string | number | (()=> void), Function> // string | number


//ReturnType<T> 的作用是用于获取函数 T 的返回类型。
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
// type T6 = ReturnType<string>; // Error
// type T7 = ReturnType<Function>; // Error


//泛型创建对象
class FirstClass {
    id: number | undefined;
}

class SecondClass {
    name: string | undefined;
}
class GenericCreator<T>{
    //{new():T} == new() => T //构造函数签名
    create<T>(c: {new(): T}):T{
        // return new T();
        return new c()
    }
}

const creator1 = new GenericCreator<FirstClass>();
const f1 = creator1.create(FirstClass);

const creator2 = new GenericCreator<SecondClass>();
const f2 = creator2.create(SecondClass);



//
function identity <T, U>(value: T, message: U) : T {
    console.log(message);
    return value;
}

console.log(identity<Number, string>(68, "Semlinker"));

//泛型接口
// interface GenericIdentityFn<T> {
//     (arg: T): T;
//  }
// type g<T> = (arg: T) => T;


//泛型类
class GenericNumber<T> {
    zeroValue: T;
    constructor(zeroValue: T) {
        this.zeroValue = zeroValue;
    }
    add:((x: T, y: T) => T) | undefined;
}


let c = new GenericNumber<number>(1);
c.add = function (x, y){
    return x+y;
}

//泛型接口
interface G<T> {
     zeroValue: T,
     add:(x: T, y: T) =>  T
}

let obj: G<string> = {
    zeroValue: 'hello',
    add(x, y){
        return x+y
    }
}

//泛型工具
//typeof 获取类型
interface Person1 {
    name: string,
    age: number
}



// type h  = typeof Person1; 不能用来获取type的type
let sem: Person1 = {
    name: 'hello',
    age: 1
}

type s = typeof  sem;
const test1:s = {
    name: 'pan',
    age:1
}


function sum(x: number, y: number):number {
    return x+y;
}
type f = typeof sum;

interface Add<T>{
    sum: f,
    msg: T
}

let obj2: Add<string> = {
    sum(x,y){
        return +'22'
    },
    msg:'ssss'
}

//keyof 该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
interface person2 {
    name: string,
    age: number
}

type p1 = keyof person2 //"name", "age"

let tp1: p1 = 'name' || 'age'; //要么name1要么name2

type p2 = keyof person2[];

let tp2: p2 = 'includes' || 'concat' //....

type p3 = keyof { [key: string]: Person }; // string | number

// let tp3: p3 = false

//为了同时支持两种索引类型，
//就得要求数字索引的返回值必须是字符串索引返回值的子类。其中的原因就是当使用数值索引时，
// JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引。
// 所以 keyof { [x: string]: Person } 的结果会返回 string | number。

type keys = 'a' | 'b' | 'c';

type obj = {
   [p in keys]: (...args: any[]) => boolean
}

let o1: obj = {
    a: () => false,
    c: () => true,
    b: ():boolean => {
        console.log('hello')
        return true
    }
}

//
interface Lengthwise {
    length: number;
}
//现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：只有length属性才行
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log((arg).length);
    return arg;
}

loggingIdentity({
    length: 1,
    name: 'panyue'
});

//泛型的约束
function returnArg<T>(arg: T[]): number {
    return arg.length;
}
// returnArg([{ length: 1 }, {length: 2}]);
console.log(returnArg<string | number>([2,4,5,'dede']));


