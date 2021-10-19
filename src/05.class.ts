//使用class
//属性: 方法
class Person {

    //实例属性 不是类属性
    //只读readonly
    readonly name: string = 'hello';
    age: number = 18

    //static静态属性
    static hello: number = 1;


    //方法
    //实例方法
    sayHello(): void {
        console.log('hello')
    }

    //static也适用于方法

}


const p1 = new Person();
// p1.name = 'ssss'; //只读不可修改
console.log(p1.age, p1.name, Person.hello);


class Dog{
    name: string
    age: number

    //构造器 对象创建时被调用
    constructor(name: string = '旺财', age: number = 18) {
        //this //在实例方法中就表示当前的实例
        this.name = name;
        this.age = age
    }

    bark(): void{
        console.log('www');
        //this ==> 当前调用方法的对象
        console.log(this);
    }
}

const dog = new Dog();
dog.bark();


(function (){

    //抽象类
    abstract class Animal{
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age
        }
        //抽象方法
        abstract sayHello():void
    }

 //继承(扩展)
    //父类的方法被继承到子类
    class Dog extends Animal{

        eat: string;

        constructor(name: string = 'defalut', age: number = 12, eat:string = 'milk') {
            //必须手动调用父类构造函数
            super(name, age);
            this.eat = eat
        }
        run(){
            console.log('run....')
        }
        //重写父类方法
        //重写参数一定要与父类一样，这一点与重载不一样
        sayHello(): number{
            console.log('wwww');
            return NaN
        }

        add(num1: number):number{
            return 1;
        }

        //没有重载
        // add(num1: number, num2: number):number{
        //
        // }

    }

    class Cat extends Animal{

        sayHello(): void {
        }

    }

    const w = new Dog();
    const cat = new Cat('hello', 12);


    //结构定义一个类的结构
    //一个类中应该包含哪些属性和方法
    //接口同时也可以当成类型声明来使用，且可以重复声明(合并)
    interface my{
      age: number,
      name: string
    }

    interface my{
        gender: string
    }

    const obj:my = {
        name: 'panyue',
        age: 18,
        gender:'female'
    }

    /**
     * 接口在定义的时候可以限制类的结构
     * 对于类来说就是一个规范，来限制类的构成
     */
    interface myInter{
        name: string,
        sayHello(): void  //全是抽象方法(这一点与抽象类不同)，接口不能有实际的值，所有的方法都不行
    }

    class myClass implements myInter{
        //实现一个接口 必须实现接口全部的属性和方法
        name: string;

        constructor(name: string) {
            this.name = name
        }

        sayHello(): void {
            console.log('what can I say')
        }

    }
    //属性的封装
})();

(function (){

    class Person {
        //不修饰符属性可以任意被修改 封装出问题
        //ts里可以在变量前面加修饰符
        /**
           private私有
           public任何
           protect子类
         */
        private name: string;
        private _age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this._age = age;
        }

        get age():number{
            return this._age;
        }

        set age( age: number ){
            if(age < 0) {
                throw new Error('年龄错误');
            }
            this._age = age;
        }

        getName(): string{
            return this.name;
        }

        setName(name: string):void{
            this.name = name
        }
    }

    const p1 = new Person('test', 18)
    // p1.name = 'test'; //可以改
    console.log(p1.getName())
    // p1.age = -1; //年龄错误
    console.log(p1.age);


    class A{
       protected num: number; //protect当前类和子类中才能访问

        constructor(num: number)  {
            this.num = num;
        }
    }

    class B extends A{
        test(){
            console.log(this.num)
        }
    }

    class C{
        //直接将属性定义在构造函数中
        constructor(public name: string, public num: number) {
        }

    }
})();


//any 少用
function fn(a: number): number{
    return a;
}

//泛型
function fn1<T>(a: T): T{
    return a;
}

fn1<string | number>(2);//指定泛型

//泛型可以同时指定多个
function fn3<T,K>(a: T, b: K, c: number): T | K{
    if(c > 0) return a;
    else return b;
}

fn3<boolean,string>(false, 'hello', 5);

interface iter{
    length: number
}

//代表这个泛型必须要有length属性
//这个泛型类必须是接口iter的子类,实现类(必须要与length属性)
function fn4<T extends iter>(a: T): number{
    return a.length
}

fn4<Array<number>>([1,3,4,5])


class MyClass<T>{
    name: T;

    constructor(name: T) {
        this.name = name;
    }

}

const mc = new MyClass<string>('hello');


//交叉类型
(function (){
    //"既有T的能力，也有U的能力"
    function test<T extends object, U extends object>(a: T, b: U): T & U{
        const res = <T & U>{}; //类型断言
        for(let key in a){
            (<T>res)[key] = a[key];
        }
        for(let key in b){
            if(!res.hasOwnProperty(key)){
                (<U>res)[key] = b[key];
            }
        }

        return res;
    }

     const obj = test({a: 1}, {b: 1});
     console.log(obj); //{a: 1, b:1} Object.assign(a,b);
})()


//类的私有字段
/**
 私有字段以 # 字符开头，有时我们称之为私有名称；
 每个私有字段名称都唯一地限定于其包含的类；
 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
 私有字段不能在包含的类之外访问，甚至不能被检测到。
 */
class  Test {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    great(){
        console.log(`hello, my name is ${this.name}`);
    }
}

console.log(new Test('pay').name);

//类方法的重载
class ProductService {
    getProducts(): void;
    getProducts(id: number): void;
    getProducts(id?: number) {
        if(typeof id === 'number') {
            console.log(`获取id为 ${id} 的产品信息`);
        } else {
            console.log(`获取所有的产品信息`);
        }
    }
}

const productService = new ProductService();
productService.getProducts();
productService.getProducts(1);


//属性是独有的,但是方法是在类的原型上,说白了就是原型链的语法糖

//在类中使用泛型

class Collection<T>{
    data: T[] = []; 

    //收集
    constructor(...data: T[]){
        this.data.push(...data); //展开 
    }

    public shift(): T | undefined {
        return this.data.length !== 0 ? this.data.shift() : undefined;
    }

}

const numberCollection = new Collection<number>(1,3,5,6);
const num = numberCollection.shift();
console.log(num);

const stringCollection = new Collection<string>('he', 'hello', 'what');
const str = stringCollection.shift();
console.log(str);

type User = {
    name: string,
    age: number
}

const userCollection = new Collection<User>({
    name:'panyue',
    age: 18
});

const user = userCollection.shift();
console.log((user as User).age);

//受保护的
{
    //继承关系
    class Person{
        protected name: string = '';
        public age: number = undefined || 0 ;
        private site: string = 'www.google.com.tw'; //私有属性只有自己能用
        private info(): string{
            return `name: ${this.name},age:${this.age}, from ${this.site}`;        
        }

        protected getInfo(): string{
            return this.info();
        }
    }

    class User extends Person {
        constructor(name: string, age: number) {
            super();
            this.name = name;
            this.age = age;
        }
        public show():void{
            console.log(this.getInfo());
        }
        //#region 
        //子类不能覆盖private
        // private info(): string{
        //     return `name: ${this.name},age:${this.age}, from ${this.site}`;        
        // }
        //#endregion
        //可以覆盖protected但是权限一定要比父类同名方法权限相同或者更宽泛
        // protected info(): string{
        //     console.log('子类');
        //     return `name: ${this.name},age:${this.age}, from ${this.site}`;        
        // }
    }
     const user = new User('hello', 18);
     user.show();
}

//构造函数中使用泛型
{
   class User<T>{

       constructor(private _user:T){
       }

       public get(): T{
           return this._user;
       }
   }

   interface UserInterface{
       name: string;
       age: number
   }
    
   const obj = new User<UserInterface>({name: 'payue', age: 21});
   console.log(obj.get().name); //panyue
}

