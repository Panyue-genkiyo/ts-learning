let a = 133 as const;

type b = typeof a;

let ts: b = 133; //类型就只是133

let a2 = [1,'sss', true, a]; // (string | boolean | number)[]

let a3 = [1,'sss', true, a] as const;  // [1，‘sss’, true  133]元组 readonly

let a4: typeof a3 = [1, 'sss', true, 133] 

//函数结构赋值中的as const断言

function hd(){
    let a = 'py';
    let b = (x : number, y: number) => x + y;

    // return [a,b] as [ typeof a, typeof b]  //或者在这也可以进行断言;//类型: (string | (x:number,y:number) => number)[]
    //或者直接根据每一个元素类型把转换为一个元组把它转化为元组
    // return [a,b] as const;  //[string, function]
    return [a, b] as const;
}

// const [n, m] = hd() as [ string,(x: number, y: number) => number]; //或者提前断言都ok
//这里你只能先断言m是个函数，否则将无法调用
// console.log((m as (x: number, y: number) => number)(18,2));

// console.log(m(1,2))

//const断言只能使用在array, enum, string, number... hd() as const 这是语法错误
const [n,m] = hd();

console.log(n, m(1,3))


