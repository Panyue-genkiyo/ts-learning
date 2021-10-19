"use strict";
/**
 * 装饰器
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//类装饰器
// function Greeter(target: Function):void{
//     target.prototype.greet = (): void => {
//         console.log('Hi!!typescript');
//     }
// }
//自定一信息
function Greeter(msg) {
    //闭包
    return function (target) {
        target.prototype.greet = function () {
            console.log(msg);
        };
    };
}
var Greeting = /** @class */ (function () {
    function Greeting() {
        //...do something
    }
    Greeting = __decorate([
        Greeter('hello world')
    ], Greeting);
    return Greeting;
}());
var g = new Greeting();
g.greet();
//# sourceMappingURL=09.decorators.js.map