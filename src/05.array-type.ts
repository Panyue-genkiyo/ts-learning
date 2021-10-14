/**
 * 数组类型 Array<T> / T[]
 */

const arr1: Array<number> = [1,2,3,4, 5]; //数组类型

const arr2: number[] = [1,3,4,56]

const sum = (...rest: number[])  => {
    return rest.reduce((prev, cur) => prev + cur, 0);
}

// sum('1',2) //编译失败

// sum(2,3,4,true); //同样编译失败
console.log(sum(1,2,4,5));
