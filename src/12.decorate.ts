//装饰器

//类装饰器(原型)
const moveDecorate: ClassDecorator = (target: Function) => {
    //往原型上添加方法
    target.prototype.name = 'py';
    target.prototype.getPosition = (): { x:number; y:number} => {
        return {
            x: 100,
            y: 200
        }
    }
}

@moveDecorate
class Tank{
    // public getPosition(){
        
    // }
}

const t = new Tank();
// moveDecorate(Tank); //结果完全一样
console.log((t as any).getPosition());//在对象原型上的方法

@moveDecorate
class Player{
    // public getPosition(){

    // }
}
const player = new Player();
console.log(( <any>player ).getPosition());
console.log(( <any>player ).name);



