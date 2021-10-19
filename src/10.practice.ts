//复习常用工具类型
export {}
//全部变成可选
type Partial_test<T> = {
    [K in keyof T]?: T[K];
}

//required 全部变为必须项
type required_test<T> = {
    [K in keyof T]-?: T[K];
}


//readonly 只可读
type readonly_test<T> = {
    readonly [K in keyof T]: T[K]; //如果前面是-readonly就是移除readonly
}

//将k中的键全转换成t
type record_test<K extends keyof any,T> = {
    [P in K]: T //K的所有属性都是类型T
}
//example
interface PageInfo{
    title: string;
}

type page = 'home' | 'about' | 'concat';

// type test = setOption<record_test<page, PageInfo>, 'home'|'about'>

//选取部分属性可以是可选的
// type setOption<T, K extends keyof T> = {
//     [P in K]?: T[P]
// }

// let tr: test = {
//     home: {
//         title: 'test'
//     },
// }


//pick将子属性挑选出来
type test_pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

//exclude从某个类型中把另一个类型踢掉
type test_exclude<T, U> = T extends U ? never : T

//extract从T中提取U
type test_extract<T, U> = T extends U ? T: never;

//Omit使用T中除了k类型的所有属性
type test_omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

//Nullable剔除null或undefined类型
type test_nullable<T> = T extends undefined | null ? never : T;

type t1 = test_nullable<string | number | null>;

//returnType获取函数的返回值
type test_returnType<T extends (...args: any) => any > = T extends (...args: any) => infer R ? R : any;

type t2 = test_returnType<()=> string>;

let s: t2 = "string" //s为string类型

//InstanceType 的作用是获取构造函数类型的实例类型。
type test_instanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R :any

class C{
   x = 0;
   y = 0
}

let c : test_instanceType<typeof C> = {
    x : 1,
    y : 1
}

//ThisType<T> 的作用是用于指定上下文对象的类型。
interface Person{
    name: string,
    age: number
}

const obj: ThisType<Person> = {
    death(){
        // this.name //string
    }
}

//Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型。
type test_params<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : any;

type A = Parameters<() =>void>; // [] 空数组
type B = Parameters<typeof Array.isArray>; // [any] //任意数据类型
type C1 = Parameters<typeof parseInt>; // [string, (number | undefined)?]
type D = Parameters<typeof Math.max>; // number[]


/**
 *  ConstructorParameters<T> 的作用是提取构造函数类型的所有参数类型。
 *  它会生成具有所有参数类型的元组类型（如果 T 不是函数，则返回的是 never 类型）。
 */
type test_constructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
type c1 = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]

let tc1: c1 = ['ddd'] // (string | undefined)?


function test(this: void) {
    //禁止使用this
    // console.log(this.name); //
}

class Rectangle {
    private w: number;
    private h: number;

    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    getArea() {
        //防止this丢失，确保this在这儿是一个Rectangle的类型
        //这里this:Rectangle只是做静态检查用
        return function(this: Rectangle){
            return this.h * this.w
        };
    }
}

const r = new Rectangle(1, 4);
const fn = r.getArea();
console.log(r.getArea().call(r))


//练习

type Foo1 = {
    a: number;
    b?: string;
    c: boolean;
}

// 测试用例
//Omit<T,K> ==> Exclude<keyof T, K>
// type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
// type SetOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>
type SetOptional<T, K extends keyof T> = {
    [P in K]?: T[P]
} & {
    [P in Exclude<keyof T, K>]: T[P]
}
type SomeOptional = SetOptional<Foo1, 'a' | 'b'>;
let ft1: SomeOptional = {
    c: true,
    a: 1,
    // b: "hello_word",
}

let ft4: Exclude<keyof Foo1, 'a' | 'b'> = 'c'; //'c'

type Foo2 = {
    a?: number;
    b: string;
    c?: boolean;
}

type SetRequired<T, K extends keyof T> = Required<Pick<T,K>> & Omit<T, K>;

// 测试用例
type SomeRequired = SetRequired<Foo2, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }

let ft2: SomeRequired = {
    b: 'sss',
    c: true
}


//练习二
interface Example {
    a: string;
    b: string | number;
    c: () => void;
    d: {};
}

// 测试用例：
type ConditionalPick<T, K> = {
    //as 当右边是never的时候则过滤掉该键，否则直接当做在取别名
    [P in keyof T as (T[P] extends K ? P: never)]:T[P]
}
type StringKeysOnly = ConditionalPick<Example, string>;
// {a: string}
let ts1: StringKeysOnly = {
    a: 'sss',
}

//5
//使用原有的Parameters和ReturnType
// type Fn = (a: number, b: string) => number
// type AppendArgument<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>;
// type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number
type Fn = (a: number, b: string) => number
type AppendArgument<F extends (...args: any) => any, A> = F extends (...args: infer P) => infer X ? (x: A, ...args: P) => X : any
type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number

let ffn : FinalFn = (x, a, b) => {
    return a + +b
}

//6
type NaiveFlat<T extends any[]> =  {
  [P in keyof T] : T[P] extends any[] ? T[P][number] : T[P]
}[number]
// 测试用例
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d'],'f']>
// NaiveResult的结果： "a" | "b" | "c" | "d"
let nt: NaiveResult = 'b';


// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];

type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
}[number]

type DeepTestResult = DeepFlat<Deep>

let dt:DeepTestResult = 'a' /// 'a' | 'b' | 'c' | 'd' | 'e'


//七
type PropertyKey = string | number | symbol
type EmptyObject = {
    [K in PropertyKey]: never
}

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
// const shouldFail: EmptyObject = { // 将出现编译错误
//     prop: "TS"
// }
type SomeType =  {
    prop: string
}

//从t2剔除t1
type Exclusive<T1,  T2 extends T1> = {
    //除了父接口T1的键存在，其余的键全部剔除
    [K in keyof T2]: K extends keyof T1 ? T2[K]: never
}
// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
    return x;
}

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = {
    prop: 'a',
    additionalProp: 'b'
}

// takeSomeTypeOnly(y); //编译错误


//8.
// 定义 NonEmptyArray 工具类型，用于确保数据非空数组。

// type NonEmptyArray<T> = [T, ...T[]]// 你的实现代码
// type NonEmptyArray<T> = T[] & { 0: T };

type NonEmptyArray<T> = {
   [P in number]: T
} & {
    0: T
}

// const a1: NonEmptyArray<string> = [] // 将出现编译错误
const b1: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。


//9
type JoinStrArray<Arr extends string[], Separator extends string, Result extends string = ""> = {

}// 你的实现代码

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"

