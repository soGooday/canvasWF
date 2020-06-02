import "./index.css"; 

// import $ from '../node_modules/zepto-webpack'
// import "./js/zeptoFx.js"
 
 

import {Game} from './js/base/Game';//引入Game脚本
import {Ease,loopType} from './js/base/DOTween'//引入Ease loopType用于设置动画组件 
import {ResList} from './ResList'; //资源加载器

class Demo   {
    constructor(){
        this.game = null;//game的上下文 
        this.init();  
    }
    init(){
        //canvas的配置设置
        let gameoConfig={ 
            canvasId:'demo',//设置canvas的id
            type:'canvas',//使用的类型 目前就这一个选项 后期可能会添加webgl
            create:this.create,//资源加载完毕后加载的方法 
            updata:this.updata,//实时更新函数 --不是用可以不写，节省性能
            actionScope:this,//作用域传入 当前的作用域传入
        }
        this.game =  Game.getInstance(gameoConfig);//取到game单利  
        this.game.loadRes(ResList);//将资源列表中的资源添加进来 
    }
    create(){ 
        //创建一幢背景图的素材
        this.Bg = this.game.createSprite(0,0,'bg');//创建一个单一游戏体的背景图片
        let  BgButton = this.Bg.addComponent('Button'); //给背景图添加上button组件
        BgButton.addEventClick((e)=>{ 
           console.log('我是背景图的点击事件')
        }) 
        this.Bg.setAnchor(0,0) ;//锚点进行设置
        this.Bg.setDebugTool(true);//显示锚点方便测试
        // this.Bg.setActive(false)
        //创建一个小人c1
        this.c1 = this.game.createSprite(0,200,'c1');
        let c1Collision = this.c1.addComponent('Collision');//添加碰撞检测事件
        let c1Aniamtion = this.c1.addComponent('DOTween');//添加DOTween动画

        //创建一个小人c2 
        this.c2 = this.game.createSprite(200,765,'c2');
        this.c2.setDebugTool(true);//显示锚点方便测试
        // this.c2.setAnchor(0,0);
        let  c2Button = this.c2.addComponent('Button'); //给背景图添加上button组件
        this.c2.setBorderBoxDebugTool(true)
        c2Button.addEventClick((e)=>{//是用BUTTON上的组件方法 
            console.log('我是c2的点击事件') 
         
        }) 
    
   

        //使用碰撞组件上的相关方法
        c1Collision.collisionTarget(this.c2)//碰撞的目标
            .onBeginContact(()=>{ console.log('相撞了'); this.c2.setActive(false)})//三种回调事件 刚刚碰触一次回调
            .incollision(()=>{console.log('正在重叠')})//三种回调事件 重叠碰触次回调
            .onEndContact(()=>{console.log('碰撞结束-----');this.c2.setActive(true),c1Collision.removeComponent()})//三种回调事件 重叠离开碰撞的回调
            .DO();//执行碰撞检测事件
        //使用x的DOTween动画
        c1Aniamtion.DOMoveX()//使用x轴移动
            .from()//出发点是当前的位置 from(不填写默认是当前X轴的坐标)
            .to(700)//前往的X轴坐标
            .setEase(Ease.Linear)//设置动画类型
            .setUseTime(3000)//动画完成使用的事件
            .setLoops(2 ,loopType.pingqang)//设置执行次数与方式
            .DO();//启动动画的执行
        //创建一个字体
        let textChilde = Game.createFontS(0,215,'textChilde')
            // .fontContent("测试位移")//设置字体的内容
            .fontSize(60)//设置字体的大小
            .fontTextAlign('center')//设置水平的左右
            .setAnchor(0.5,0.5)
            .fontTextBaseline('top'); //设置垂直的上下
        //将上面的字体变为c1的子node
        this.c1.addChiled(textChilde); 
        this.c1.setDebugTool(true); 
        //给c1增加一个DOTween动画
        c1Aniamtion.DOScale().from(new v2(1,1)).to(new v2(1.5,1.5)).setEase(Ease.Quad.easeInOut)
            .setUseTime(1000)
            .setLoops(2,loopType.pingqang) 
            .setDelayed(0)//动画延时时间
            .onComplete(()=>{console.log('当前的动画执行完毕了!',text.x)})//当前的动画执行完毕的回调
            .everyFrame()//期间的每帧动画的回调
            .DO(); //启动动画的执行
        //创建一个字体
        let text = Game.createFontS(357,500,'text');
        text.fontContent("测试位置");//设置字体的内容
        text.fontSize(60).fontColor('#000000');//字体的色号
        // text.fontTextAlign('center'); //水平的模式
        text.setAnchor(1,1);//锚点设置为欸右下角
        text.setRotateTo(0);
        this.text1 = text;
        this.text1.setDebugTool(true);//打开锚点测试
        // text.setScale(1.5,1.5);
        // text.setPosition(0,100-60/8*1)
        //给字体添加DOTween组件
        let textAnimaiton = text.addComponent('DOTween');
        //使用刚刚添加组件的DOTween动画
        textAnimaiton.DOScale().from({x:0.5,y:0.5}).to({x:1.5,y:1.5}).setEase(Ease.Quad.easeInOut)
            .setUseTime(500)
            .setLoops(2,loopType.pingqang) 
            .setDelayed(0)
            .onComplete(()=>{console.log('当前的动画执行完毕了!',  console.log('textChilde.positon:',))})//当前的动画执行完毕的回调
            .everyFrame()//期间的每帧动画的回调
            .DO(); 
    
     
        //添加一个柠檬的素材
        this.lemon = this.game.createSprite(350,500,'lemon');
        //给柠檬添加一个Button的组件
        let lemonBtn = this.lemon.addComponent('Button'); 
        //使用Button组件的方法
        lemonBtn.addEventDown(()=>{//是用BUTTON上的组件方法
            this.lemon.setRotateBy(10);
            this.text1.setRotateBy(10); 
            console.log('我是柠檬')
        }) 

        //创建一个小人c1  我是页面中被拖动的小人
        this.c11 = this.game.createSprite(600,900,'c1'); 
        let  c11Button= this.c11.addComponent('Button'); 
        c11Button.addMoveEvent(event=>{//是用BUTTON上的组件方法
            let {x,y} = event.position;
            this.c11.setPosition(x,y)
        //    console.log('我是小人11',event.position)
        }) 
        let c11_title =  Game.createFontS(600,930,'text'); 
        c11_title.fontContent("我可以被拖动");//设置字体的内容
        c11_title.fontSize(30).fontColor('#ffffff');//字体的色号
        this.c11.addChiled(c11_title)
        //创建出来一把刀子
        this.knifelogo = this.game.createSprite(350,680,'knifelogo');  
        //设置刀子的角度  为90  
        this.knifelogo.setRotateTo(90);
        //将刀子设为柠檬子节点
        this.lemon.addChiled(this.knifelogo);
        //展示当前屏幕的相关信息 像素及其像素比
        this.game.showCanvasWH(400,50); 
    } 

    updata(){
        // this.lemon.setRotateBy(1);//
        //使得柠檬的不断的转动
        // this.lemon.rotate +=1;  
        this.lemon.setRotateBy(1);
        // this.text1.setRotateBy(5);
    }
}
new Demo();

class v2 {
    constructor(x,y){
        return {x,y}
    }
}
 