"use strict";
var a = 133;
var ts = 133; //类型就只是133
var a2 = [1, 'sss', true, a]; // (string | boolean | number)[]
var a3 = [1, 'sss', true, a]; // [1，‘sss’, true  133]元组 readonly
var a4 = [1, 'sss', true, 133];
//函数结构赋值中的as const断言
function hd() {
    var a = 'py';
    var b = function (x, y) { return x + y; };
    return [a, b]; //类型: (string | (x:number,y:number) => number)[]
}
var _a = hd(), n = _a[0], m = _a[1];
//这里你只能先断言m是个函数，否则将无法调用
console.log(m(1, 2));
//# sourceMappingURL=11.const.js.map