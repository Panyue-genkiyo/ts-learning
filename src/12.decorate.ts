import { createModuleResolutionCache, MethodDeclaration } from "typescript";

//装饰器
export {};

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

//装饰器工厂

const MusicDecoratorFactory = (type: string): ClassDecorator => {
    switch(type.toLowerCase()){
        case 'tank':
            return (target: Function) => {
              target.prototype.playMusic = (): void  => {
              console.log('播放ttt');
           }
        }
        case 'player':
            return (target: Function) => {
                target.prototype.playMusic = (): void  => {
                console.log('播放www');
            }    
         }
        default: 
          return (target: Function) => {
            target.prototype.playMusic = (): void  => {
            console.log('无');
          }    
       }
   }
}

@MusicDecoratorFactory('tank')
class Tank1{
        
}
let t1 = new Tank1();
(<any>t1).playMusic();




//typescript方法装饰器

const showDecorator:MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    //#region 
    // console.log(args);
    // // const md = args[2].value; //代表函数
    // // md();
    // //改掉该show函数
    // args[2].value = () => {
    //     console.log('hello');
    // }
    //#endregion
    console.log(descriptor); //打印方法的描述
    // descriptor.value = () => { 
    //     console.log('py')
    // }
    descriptor.writable = false;
}
class User{
    @showDecorator
    public static show(){
       console.log('logo');
    }
     //静态方法的装饰器
      
}

User.show();

//因为这里writeable:false所以无法改动该函数
// User.show = (): void => { 
//    console.log('show method!!');
// }
// User.show();
