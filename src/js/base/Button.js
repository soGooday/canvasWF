
import {Game, gameInfo} from './Game';
/**
 * 当前组件的信息
 */
let componentInfo={
    constructor:null,//当初实力本组件的原型 
    self:null,//当前的作用域
}
export default class Button{
    constructor(scope){
        componentInfo.constructor = scope;
        console.log('bttonScope:',scope);
    }
  
    //-----------------事件点击系统---------------------

    /*传入Event对象*/
    /**
     * 传入canvas 与 鼠标点击的Event
     * @param{canvas} element
     * @param{event} event
     * @returns {{x: number, y: number}}
     */
    getPoint(element, event) {
        event = event || window.event;
        /*将当前的鼠标坐标值减去元素的偏移位置，返回鼠标相对于element的坐标值*/
        var x = (event.pageX*2 || event.clientX*2 + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (event.pageY*2 || event.clientY*2 + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return {
            x: x,
            y: y,
        };
    }

    /**
     * 传入 getPoint() 返回的参数
     * @param e
     * @returns {boolean} 是不是点击到相关按钮了
     */
    isClick(e){
        let son = componentInfo.constructor;
        //比例进行矫正
        let btnObj={
            x:son.x*window.remscale,
            y:son.y*window.remscale,
        };
        e.x = e.x*window.remscale;
        e.y = e.y*window.remscale;

        let lfetX_ = btnObj.x + (son.img.width*son.SpiritInfo.imageScaleNum);
        let rightY_ = btnObj.y  + (son.img.height*son.SpiritInfo.imageScaleNum);

        if(e.x<=lfetX_ && e.x>=btnObj.x  && e.y<=rightY_ && e.y>=btnObj.y ){
            return true;
        }
        return false;
        

    }

    /**
     * 为了精灵添加点击事件
     * @param BACKFUN 回调函数
     */
    addEventClick(BACKFUN){
        gameInfo.drawCanvas.addEventListener('click',e=>{
            if(this.isClick(this.getPoint(gameInfo.drawCanvas,e)) === true){
                BACKFUN();
            }
        },false);
    }
    /**
     * 为了精灵添加点鼠标悬浮的事件
     * @param BACKFUN 回调函数
     */
    addEventSuspension(BACKFUN){
        this.addEventDown(()=>{
            if(gameInfo.eventFun.has(this.spritName) === false){
                gameInfo.eventFun.add([this.spritName,BACKFUN]);
            }else {
                new  Error('此精灵已经调取了这个方法了,不可以添加了');
            }
        });

    }
    /**
     * 为了精灵添加点鼠标按下的事件
     * @param BACKFUN 回调函数
     */
    addEventDown(BACKFUN){
        gameInfo.drawCanvas.addEventListener('touchstart', (event) => {
            if(this.isClick(this.getPoint(gameInfo.drawCanvas,event.changedTouches[event.changedTouches.length-1])) === true){
                BACKFUN();
            }
        }) 

    }
    /**
     * 为了精灵添加点鼠标抬起件事件
     * @param BACKFUN 回调函数
     */
    addEventUp(BACKFUN){
        gameInfo.drawCanvas.addEventListener('touchend', (event) => {
            if(this.isClick(this.getPoint(gameInfo.drawCanvas,event.changedTouches[event.changedTouches.length-1])) === true){
                BACKFUN();
            }
        }) 

    }
}