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

//模拟代码高亮加深对函数装饰器的理解
const highDecorator :MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const method = descriptor.value;
    descriptor.value = () => { 
        return `<div style='color:red;'>${method()}</div>`
    }
}
class UT{
    @highDecorator
    public static response(){
       return 'py';
    }
     //静态方法的装饰器
}

console.log(UT.response());

//延迟执行
const SleepDecorator  = (time: number): MethodDecorator => {
    return (...args: any[]) => {
        const [,,descriptor] = args; //解构赋值
        const method = descriptor.value;
        descriptor.value = () => {
            setTimeout(() => {
                method();
            }, time);
        }
    }
} 
class defUT{
    @SleepDecorator(1000)
    public static response(){
        console.log('hello');
    }
}

defUT.response();

//使用装饰器来进行全局的异常管理
const ErrorDecorate: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const method = descriptor.value;
    descriptor.value = () => {
        try{
          method();
        }catch(e:any){
          console.log(`%c${e.message}`, "color: green;font-size: 20px");  
        }
    }
}

class UE{
    @ErrorDecorate
    show(){
      throw new Error('something wrong has been happend');   
    }
}

new UE().show();

//鉴权案例
interface U{
    name: string, 
    isLoading: boolean,
    permission: string[],
}

let user: U = {
    name: 'panyue',
    isLoading: true,
    permission: ['store', 'mange']
}

//鉴权装饰器
const PermissionDecorator = (permission:string[]): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
        let md = descriptor.value;
        descriptor.value = () => {
            const validate = (): boolean => {
               return  permission.every(k => user.permission.includes(k));
            }
            if(!user.isLoading || !validate()){
               console.log('你没有登陆或者权限不够');
            }else{
                md();
            }
        }
    }
}
class Artical{
    
    show(){
        console.log('展示文章列表');
    }
    @PermissionDecorator(['store', 'mange'])
    store(){
        console.log('保存文章');
    }
}

new Artical().store();

//通过装饰器模拟异步请求

const RequestDecorator = (url: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
       const md = descriptor.value; 
       new Promise<any[]>(resolve =>  { 
           setTimeout(() => {
               resolve([{ name: 'py1' }, {name: 'py2'}]);
           }, 2000)   
        })
        .then(users => {
            md(users);
        });
    }
}

class Usr{
    @RequestDecorator('www.baidu.com')
    public all(users?: any[]){
        console.log(users);
    }
}

new Usr().all();