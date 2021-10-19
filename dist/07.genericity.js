"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通过 keyof 操作符，我们就可以获取指定类型的所有键，
 * 之后我们就可以结合前面介绍的 extends 约束，即限制输入的属性名包含在 keyof 返回的联合类型中。
 * 具体的使用方式如下：
 */
//k只能是T的键注意
function getProperty(obj, key) {
    return obj[key];
}
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 0] = "Easy";
    Difficulty[Difficulty["Medium"] = 1] = "Medium";
    Difficulty[Difficulty["Hard"] = 2] = "Hard";
})(Difficulty || (Difficulty = {}));
var tsInfo = {
    name: "Typescript",
    supersetOf: "Javascript",
    difficulty: Difficulty.Medium,
    easy: 0
};
var diff = getProperty(tsInfo, "difficulty"); //这里的k只能是name,supersetOf, difficulty, easy
var easy = getProperty(tsInfo, "easy");
// let name: Difficulty = getProperty(tsInfo, "name"); //错误，编译错误，字符串不能赋给枚举
console.log(diff); //1
console.log(easy); //0
console.log(Difficulty[easy]); //Easy
var a1 = {
    name: "string test"
};
var a2 = {
    name: 1204
};
function updateTodo(todo, filedsUpdateTodo) {
    //Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
    return __assign(__assign({}, todo), filedsUpdateTodo);
}
updateTodo({
    title: 'hello',
    description: 'none'
}, {
    title: 'updateTodo'
});
var x = {
    about: {
        title: 'about'
    },
    home: {
        title: 'home'
    },
    concat: {
        title: 'concat'
    }
};
// keyof T "name" | "age" | "phone" | "grade"
var test = {
    name: 'hello',
    phone: 88888
};
// type T6 = ReturnType<string>; // Error
// type T7 = ReturnType<Function>; // Error
//泛型创建对象
var FirstClass = /** @class */ (function () {
    function FirstClass() {
    }
    return FirstClass;
}());
var SecondClass = /** @class */ (function () {
    function SecondClass() {
    }
    return SecondClass;
}());
var GenericCreator = /** @class */ (function () {
    function GenericCreator() {
    }
    //{new():T} == new() => T //构造函数签名
    GenericCreator.prototype.create = function (c) {
        // return new T();
        return new c();
    };
    return GenericCreator;
}());
var creator1 = new GenericCreator();
var f1 = creator1.create(FirstClass);
var creator2 = new GenericCreator();
var f2 = creator2.create(SecondClass);
//
function identity(value, message) {
    console.log(message);
    return value;
}
console.log(identity(68, "Semlinker"));
//泛型接口
// interface GenericIdentityFn<T> {
//     (arg: T): T;
//  }
// type g<T> = (arg: T) => T;
//泛型类
var GenericNumber = /** @class */ (function () {
    function GenericNumber(zeroValue) {
        this.zeroValue = zeroValue;
    }
    return GenericNumber;
}());
var c = new GenericNumber(1);
c.add = function (x, y) {
    return x + y;
};
var obj = {
    zeroValue: 'hello',
    add: function (x, y) {
        return x + y;
    }
};
// type h  = typeof Person1; 不能用来获取type的type
var sem = {
    name: 'hello',
    age: 1
};
var test1 = {
    name: 'pan',
    age: 1
};
function sum(x, y) {
    return x + y;
}
var obj2 = {
    sum: function (x, y) {
        return +'22';
    },
    msg: 'ssss'
};
var tp1 = 'name' || 'age'; //要么name1要么name2
var tp2 = 'includes' || 'concat'; //....
var o1 = {
    a: function () { return false; },
    c: function () { return true; },
    b: function () {
        console.log('hello');
        return true;
    }
};
//现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：只有length属性才行
function loggingIdentity(arg) {
    console.log((arg).length);
    return arg;
}
loggingIdentity({
    length: 1,
    name: 'panyue'
});
//# sourceMappingURL=07.genericity.js.map