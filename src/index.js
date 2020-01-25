import "./scss/rem.scss"
import "./index.scss"; 

// import $ from '../node_modules/zepto-webpack'
// import "./js/zeptoFx.js"
 
 

import {Game} from './js/base/Game';
import {Ease,loopType} from './js/base/DOTween'
import {ResList} from './ResList'; 

class fruitMachines   {
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
        this.Bg = Game.createSpriteS(0,0,'bgIamge');//创建一个单一游戏体的背景图片
        let  bgButton = this.Bg.addComponent('Button'); 
        bgButton.addEventClick(()=>{
            console.log('点击了按钮的事件')
        })
        // this.Bg.addEventUp(()=>{
        //     console.log('抬起了按钮的事件')
        // })
        
        // let BgAnimation = this.Bg.addComponent('DOTween'); 
        //  BgAnimation.DOMoveX().from().to(500).setEase(Ease.Elastic.easeInOut).setUseTime(1000)
        //     .setLoops(1)
        //     .setDelayed(1000)
        //     .onComplete(()=>{console.log('当前的动画执行完毕了!')})
        //     .everyFrame((index)=>{console.log(index)})
        //     .DOAnimation();
        let text = Game.createFontS(100,200,'text');
        text.fontContent("测试位置");
        text.fontSize(60).fontColor('#000000');
        text.fontTextAlign('start');
        let textAnimaiton = text.addComponent('DOTween');
        textAnimaiton.DOMove().from().to({x:500,y:500}).setEase(Ease.Quad.easeInOut)
            .setUseTime(1000)
            .setLoops(0,loopType.pingqang) 
            .setDelayed(1000)
            // .onComplete(()=>{console.log('当前的动画执行完毕了!',text.x)})
            // .everyFrame((index)=>{console.log(index)})
            .DOAnimation();
        this.game.showCanvasWH();
        this.updata();//资源更新加载
    }
    //函数更新
    updata(){
        this.game.drawRes();

 
 
        window.requestAnimationFrame(this.updata.bind(this));
    }
}
new fruitMachines();
 