import "./index.css"; 
import $ from '../node_modules/zepto-webpack'
// import "./js/zeptoFx.js"
 
 

import {Game} from './js/base/Game';
import {ResList} from './ResList';
import {SingleObj} from './js/component/SingleObj';

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
        this.Bg = new SingleObj(0,0,'bgIamge');//创建一个单一游戏体的背景图片

  
        this.game.setCanvasWH();//设置canvas的宽高 === css 中canvas的宽高
        this.updata();//资源更新加载
    }
    //函数更新
    updata(){
        this.game.drawRes();

 
 
        window.requestAnimationFrame(this.updata.bind(this));
    }
}
new fruitMachines();
 