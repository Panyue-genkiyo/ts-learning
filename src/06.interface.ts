export {}
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}

//接口继承类
class a{
    constructor(public name: string) {
        this.name = name;
    }
}

interface b extends a{
    x: number,
    y: number,
    run:() => void
}

const test: b = {
    x: 1,
    y: 2,
    name: 'payue',
    run(){
        console.log();
    }
}

//创建类之后也是创造了一个新的类型
class Point{
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}


const p  = new Point(1,2);

const printPoint = (p : Point): void => {
    console.log(p.x, p.y);
}

printPoint(p);


interface myIter<T>{
    (value: T): Array<T>
}

const fn23: myIter<any> = function<T>(value: T): Array<T>{
    return [value];
}

fn23(1);

//泛型类

type FN<T = string> = {
    name: T;
    addName: (x:T, y: T) => void
}
//
// const obj: FN = {
//     name: '1',
//     addName(){
//         return 1;
//     }
// }
//  const xui = obj.addName('hello','say');
//  console.log(xu
// i

//声明合并
interface mo {
    num: number,
    add(n: number): number
}

interface mo{
    add(n: string): string
}

const p2: mo = {
    num: 2,
    //两个add合并就是函数重载
    //这里只能用any来接收不然兜不....
    add(n: any): any{
        return n;
    }
}

// interface Alarm {
//     price: number;
//     alert(s: string): string;
// }
// interface Alarm {
//     weight: number;
//     alert(s: string, n: number): string;
// }
//
// const a3: Alarm = {
//     weight: 1,
// }


//  接口的可选值
interface ITer{
    readonly page: number,
    add?():void  //可选属性add
}

const ex: ITer = {
    page: 1
}

// ex.page = 3; //只读不能修改
console.log(ex.add?.call(null)); //undefined

//函数类型的接口
interface IFnc{
    (x: number, y: number, data?:string): number
}

const sum: IFnc = function (x, y, data){
    console.log(data, x + y);
    return x + y;
}
console.log(sum(1,1));
//针对上述只有一个函数类型的直接使用type来替换interface
//注意:不过上面的接口中只有一个函数，TypeScript 会给我们一个建议，可以使用 type 来定义一个函数的类型：

type func = (fn: string, ln?:string) => string;

const rname: func = (firstName, lastName) =>  {
   if(!lastName) return firstName;
   return `${firstName} - ${lastName}`;
}

console.log(rname('pan', 'yue'));
console.log(rname('pan'));

//接口也可以被类实现
//接口通常用于来定义某种规范, 类似于你必须遵守的协议,(共同的规范抽象为接口)
//接口只规定了类里必须提供的属性和方法，从而分离了规范和实现，增强了系统的可拓展性和可维护性
interface P{
    title: string,
    log(): void
}

class test2 implements P{
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    log():void{
        console.log('test....')
    }
}

//接口的继承
// 和类一样，接口也能继承其他的接口。这相当于复制接口的所有成员。接口也是用关键字
interface Shape{
    color: string
}

interface Square extends Shape{
    sideLength: number;
}

//尽管支持继承多个接口,但是如果继承的接口中，定义的同名属性的类型不同的话，是不能编译通过的。如下代码：

interface i1{
    a: number
}

interface i2 extends i1{
    // a: string //编译不通过
}

//接口继承test4
class test4{
    // a: number;

    static hello():void{
        console.log('hello');
    }

    constructor(public a: number) {
        //记住一旦写了
        this.a = a;
    }

    print(value: string):void{
        console.log(value)
    }
}

interface t4 extends test4{
    b: 3,
}

const tl: t4 = {
    b: 3,
    a: 2,
    print(value: string) {
        ////
    }
}
/**
 * type 可以而 interface 不行
 */

//1.type定义别名,interface不行
type Name = string

//联合类型
interface Dog{
    spark():void
}

interface Cat{
    miao():void
}

type Pet = Dog | Cat //别名

let p1: Pet = {
    spark() {
    }
}

type PetList = [Dog, Pet]; //元组

let p3: PetList = [{ spark() {
    }
}, { miao() {
    }
}];

///type 语句中还可以使用 typeof 获取实例的 类型进行赋值

let d = document.getElementById('div');
type B = typeof d;

//type的操作
type StringOrNumber = string | number;
type Text = string | { text: string };
// type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void; //泛型
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };

let cl:Callback<string> = (num) => {
    console.log(num);
}

// cl(1);

let pr: Pair<string> = ['eee', "ssss"];////

// interface 可以而 type 不行

interface User {
    name: string
    age: number
}

interface User {
    sex: string
}

let u: User = {
    name: 'py',
    age: 12,
    sex: 'male'
}

//type与interface

interface common{
    name: string,
    age: number,
}

interface person<T> extends common{
    sex: T
}

let lucy:person<number> = {
    name: 'py',
    age: 2,
    sex: 0
}

//type使用交叉类型完成同样的工作
type c = {
    name: string,
    age: number
}
type p<T> = {
    sex: T
} & c; //既是c也是t,类似与接口的继承

let lily:p<number> = {
    name: 'lily',
    age: 12,
    sex: 1
}

//type可以使用交叉类型,联合类型,元组
type p1 = p<number> | p<string>
type p2 = [p<number>, p<string>];

const p_test: p2 = [{ name: 's1', age: 2, sex:1 },{ name: 's2', age: 3, sex:"male" } ]

//type可以结合typeof使用
class Config{
   static hello = () => console.log('hello');
   setPerson(age: number, sex: string){
       ///...
   }
}

type c1 = typeof Config;

let C:c1 = class {
   //结构要一样
    setPerson(){

    }
    static hello(){

    }
}

/**
 * 总结:typescript中类型别名type和接口interface在使用上的一些区别，
 * 在类class的类型定义中我们使用接口interface来做，
 * 在定义简单类型、联合类型、交叉类型、元组时我们用类型别名type来做，并且它和typeof能够天然的结合在一起使用。
 */

{
    //接口中使用泛型和泛型的多类型定义
    interface ArticleInterFace<B, C>{
        title: string
        isLock: B
        comment?: C[]
    }

    type CommentType = {
        content: string,
        author: string
    }
   
    const at: ArticleInterFace<boolean, CommentType> = {
        title: 'hello.com',
        isLock: true,
        comment: [{
            content: 'comment....',
            author: 'hello'
        }]
    } 

}