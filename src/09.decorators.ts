/**
 * 装饰器
 */

//类装饰器
// function Greeter(target: Function):void{
//     target.prototype.greet = (): void => {
//         console.log('Hi!!typescript');
//     }
// }

//自定一信息
function Greeter(msg: string):Function{
    //闭包
   return function (target: Function): void {
       target.prototype.greet = (): void => {
           console.log(msg)
       }
   }
}

@Greeter('hello world')
class Greeting{
    constructor() {
        //...do something
    }
}

let g = new Greeting();
(g as any).greet();

