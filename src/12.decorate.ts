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


//消息处理可以变为装饰器来使用
//构造函数类型为参数(class就是构造函数function的语法糖)
const MessageDecorator = (target: Function) => {
    target.prototype.message = (content: string) => {
        console.log(content);
    }
}
@MessageDecorator
class LoginController{
    public login(){
        console.log('登录成功!!');
        (<any>this).message('loding success msg');
    }
}

new LoginController().login();

//复用装饰器,继承的另一条出路
@MessageDecorator
class ArticleController{
    public store(){
       (this as any).message('保存成功!!');
    }
}

new ArticleController().store();