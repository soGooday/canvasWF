import "./scss/rem.scss"
import "./index.scss"; 

// import $ from '../node_modules/zepto-webpack'
// import "./js/zeptoFx.js"
 
 

import {Game} from './js/base/Game';
import {Ease,loopType} from './js/base/DOTween'
import {ResList} from './ResList'; 

class Demo   {
    constructor(){
        this.game = null;//game的上下文 
        this.init();
        this.bin();
    }
    init(){
        this.game =  Game.getInstance();//取到game单利  
        this.game.loadRes(ResList,()=>{this.create();});//将资源列表中的数据添加进来
        console.log('ResList:',ResList);//打印一下 我们添加的图片资源
    }
    bin(){
      
    }
    create(){ 
        //创建一幢背景图的素材
        this.Bg = Game.createSpriteS(0,0,'bg');//创建一个单一游戏体的背景图片
        let  bgButton = this.Bg.addComponent('Button'); //给背景图添加上button的按钮时间
        bgButton.addEventClick(()=>{
            console.log('点击了按钮的事件')
        })

        this.c1 = Game.createSpriteS(50,200,'c1');//创建一个小人
        let c1Collision = this.c1.addComponent('Collision');//添加碰撞检测事件
        let c1Aniamtion = this.c1.addComponent('DOTween');//添加DOTween动画

        this.c2 = Game.createSpriteS(600,200,'c2');//创建另外一个小人
        this.c2.scale(-1,1);//将以Y轴进行反转
        //使用碰撞组件上的相关方法
        c1Collision.collisionTarget(this.c2)//碰撞的目标
            .onBeginContact(()=>{ console.log('相撞了'); })//三种回调事件
            .incollision(()=>{console.log('正在重叠')})
            .onEndContact(()=>{console.log('碰撞结束')})
            .DO();//执行碰撞事件
        //使用x的DOTween动画
        c1Aniamtion.DOMoveX().from().to(700)
            .setEase(Ease.Quad.easeInOut)
            .setUseTime(1000)
            .setLoops(2,loopType.pingqang) 
            .DOAnimation();
        //将建一个字体
        let text = Game.createFontS(376,200,'text');
        text.fontContent("测试位置");//设置字体的内容
        text.fontSize(60).fontColor('#000000');//字体的色号
        text.fontTextAlign('center'); //水平的模式
        let textAnimaiton = text.addComponent('DOTween');//给字体使用DOTween动画
        textAnimaiton.DOScale().from({x:0.5,y:0.5}).to({x:1.5,y:1.5}).setEase(Ease.Quad.easeInOut)
            .setUseTime(1000)
            .setLoops(2,loopType.pingqang) 
            .setDelayed(0)
            .onComplete(()=>{console.log('当前的动画执行完毕了!',text.x)})//当前的动画执行完毕的回调
            .everyFrame((index)=>{console.log(index)})//期间的每帧动画的回调
            .DOAnimation();

        this.game.showCanvasWH();//展示当前屏幕的相关信息
        this.updata();//资源更新加载
    }
    //函数更新
    updata(){
        this.game.drawRes(); 
        window.requestAnimationFrame(this.updata.bind(this));
    }
}
new Demo();
 