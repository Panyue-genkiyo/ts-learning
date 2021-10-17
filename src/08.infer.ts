//infer关键字
//infer可以在extends的条件语句中推断待推断的类型
//infer待推断的类型
export {}
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any; //t是一个函数则将其返回值的类型当做ReturnType的类型
type fn = () => number;
type s = string;
type fnReturnType = ReturnType<fn>;
type sReturnType = ReturnType<s>


let n: fnReturnType = 1; //n此时是number类型
let ss: sReturnType = 'deede' //ss为any类型


//用promise来理解infer
type promiseResType<T> = T extends Promise<infer R> ? R: T; //如果T是一个待推断类型的promise则返回其推断之后的类型，否则则返回T

async function strPromise(){
    return 'str';
}

async function numberPromise(){
    return 123;
}

interface Person{
    name: string,
    age: number
}

async function personPromise(){
    return {
        name: 'panyue',
        age: 21,
    } as Person; //类型断言 //直接避免编译器检查
}

type setp = ReturnType<typeof strPromise>; //Promise<string>
//反解
type strp_res = promiseResType<setp>; //string
//同理
type personPromise = ReturnType<typeof personPromise>; //Promise<Person>
type personPromiseRes = promiseResType<personPromise>; //Person

let p: personPromiseRes = {
    name: 'hello',
    age: 1
};

//反解参数类型
type Fn<A extends any[]> = (...args: A) => any
type FnArgs<T> = T extends Fn<infer A> ? A : T //检查T是否为一个待推断类型的Fn,如果是则返回其推断之后的类型,否则返回T

function strFn(name: string){

}

type StrFn = FnArgs<typeof strFn>

//拆包
type Unpacked<T> = T extends (infer R)[] ? R : T;

type Ids = number[];
type Names = string[];

type idType = Unpacked<Ids>; // idType 类型为 number
type nameType = Unpacked<Names>; // nameType 类型为string


