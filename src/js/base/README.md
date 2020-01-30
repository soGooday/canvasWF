# API的介绍
    这个是关于canvasWF的API的介绍。主要是对
    核心代码Game。
    资源注册器-目前仅指图片资源的加载
    创建图片Spriit，字体的Text
    组件Button,Collision,DOTween。
    公共部分Behaviour ， Spriit与Text继承于Behaviour
## Game
#### getInstance(config) 
    /**
     * 创建一个game的单例
     * @param {}config 
     *          string canvasId 创建出来的canvasID 
     *          string type 填写类型 目前只有canvas 
     *          function create 素材加载完毕后的执行函数仅仅执行一次 必须填写 所以canvas的渲染要在这个回调中执行
     *          function updata 真更新函数
     *          objcet actionScope作用域
     */
    * 
    
    ##### 示例 
    ```javascript
        import {Game} from './js/base/Game';//引入Game脚本
            let gameoConfig={ 
            canvasId:'demo',//设置canvas的id
            type:'canvas',//使用的类型 目前就这一个选项 后期可能会添加webgl
            create:this.create,//资源加载完毕后加载的方法 
            updata:this.updata,//实时更新函数 --不是用可以不写，节省性能
            actionScope:this,//作用域传入 当前的作用域传入
        }
        this.game =  Game.getInstance(gameoConfig);//取到game单利  
    ```