"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var s = "string"; //s为string类型
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
        this.y = 0;
    }
    return C;
}());
var c = {
    x: 1,
    y: 1
};
var obj = {
    death: function () {
        // this.name //string
    }
};
var tc1 = ['ddd']; // (string | undefined)?
function test() {
    //禁止使用this
    // console.log(this.name); //
}
var Rectangle = /** @class */ (function () {
    function Rectangle(w, h) {
        this.w = w;
        this.h = h;
    }
    Rectangle.prototype.getArea = function () {
        //防止this丢失，确保this在这儿是一个Rectangle的类型
        //这里this:Rectangle只是做静态检查用
        return function () {
            return this.h * this.w;
        };
    };
    return Rectangle;
}());
var r = new Rectangle(1, 4);
var fn = r.getArea();
console.log(r.getArea().call(r));
var ft1 = {
    c: true,
    a: 1,
    // b: "hello_word",
};
var ft4 = 'c'; //'c'
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }
var ft2 = {
    b: 'sss',
    c: true
};
// {a: string}
var ts1 = {
    a: 'sss',
};
// (x: boolean, a: number, b: string) => number
var ffn = function (x, a, b) {
    return a + +b;
};
// NaiveResult的结果： "a" | "b" | "c" | "d"
var nt = 'b';
var dt = 'a'; /// 'a' | 'b' | 'c' | 'd' | 'e'
// 测试用例
var shouldPass = {}; // 可以正常赋值
// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x) {
    return x;
}
// 测试用例：
var x = { prop: 'a' };
takeSomeTypeOnly(x); // 可以正常调用
var y = {
    prop: 'a',
    additionalProp: 'b'
};
// const a1: NonEmptyArray<string> = [] // 将出现编译错误
var b1 = ['Hello TS']; // 非空数据，正常使用
//# sourceMappingURL=10.practice.js.map