import {Animation} from './Animation.js';//引用游戏脚本
import {Game, gameInfo} from './Game';
import {Behaviour} from './Behaviour';


export class Spirit extends Behaviour{
    //初始化将相关的数据取到
    constructor(context,img,spritName){
        super();

        this.TypeName = 'Spirit';
        this.spritName = spritName;
        this.setActiveState = true;//画图
        this.spritMarkName = spritName;//默认是自己的名字





        //相关的参数
        this.SpiritInfo={
            imageScaleNum:window.remscale,//默认图片的基准大小
            rotateInfo:{//旋转的相关参数
                rotateNum:0,//当前相关到的多少度
                transfromX:0,//X周的偏移量
                transfromY:0,//Y的偏移量
                easeIn:{//先块后慢的参数
                    roateNum:0,//累计的角度
                }
            },
            anchorInfo:{//锚点参数
                anchorX:0.5,//锚点X坐标上的差值
                anchorY:0.5,//锚点Y坐标上的差值
            },
            alpha:0,//精灵的透明度中间参数
            color:{ //默认是不透明的白色
                r:255,
                g:255,
                b:255,
                a:255,
            },
            animationinfo:{
                moveState:0,//0是可以运动 -1是不可以运动
                scaleState:0,//0是可以放大缩小 -1是不可以放大缩小
            },
            EaseOutMove:{//加速度的参数
                vx:0,
                vy:0,
            },
            scaleInfo:{
                EaseIn:{//先块后慢的参数
                    vx:0,
                    vy:0,
                },
                onceChangeState:0,//一次的方法缩小的状态显示
            }




        };

        this.context = context;
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.scaleW=1;//对canvas的放大缩小width
        this.scaleH=1;//对canvas的方法缩小height
        this.imageW = this.img.width*this.SpiritInfo.imageScaleNum;//宽
        this.imageH = this.img.height*this.SpiritInfo.imageScaleNum;//高
        this.alphaNum = 1;


        // console.log('当前的图片的宽高：',this.img.width,this.img.height)
        // gameInfo.canvas.width = this.img.width;
        // gameInfo.canvas.height = this.img.height;


        this.scale(1,1);//

        // super.initData(this);
        // console.log('super',super);
    }

    /**
     * 起一个独特的标示名字
     * @param Name_
     */
    makeSpritMarkName(Name_){
        this.spritMarkName = Name_;
    }

    /**
     * 取到唯一标示
     * @returns {*}
     */
    getSpritMarkName(){
        return this.spritMarkName;
    }

    //取出来精灵的名字是什么
    getSpiritName(){
        return this.spritName;
    }
    /**
     * 取到坐标
     */
    getPosition(){
        let positionInfo={
            x:this.x,
            y:this.y,
        }
        return positionInfo;
    }
    /**
     * 取到物体的宽与高
     */
    getObjWH(){
        let ObjWHInfo={
            width:this.imageW,
            height:this.imageH,
        }
        return ObjWHInfo;
    }
    /**
     * 确定这个图片的锚点在哪里 现在只适用于旋转的锚点设置 移动的锚点正在添加ing
     * @param{number} anchorX 左边->右边（0-1）传进来的是小数
     * @param{number} anchorY 上边->下边（0-1）传进来的是小数
     */
    anchor(anchorX,anchorY){
        (this.SpiritInfo.anchorInfo={anchorX,anchorY});
    }
    /**
     * 设置精灵的透明度
     * @param{number} num 范围 0-1
     */
    alpha(num){
        this.alphaNum = num;

    }

    /**
     * 设置颜色
     * @param{number} r 范围 0-255
     * @param{number} g 范围 0-255
     * @param{number} b 范围 0-255
     * @param{number} a 范围 0-255
     */
    color(r,g,b,a){
        (this.SpiritInfo.color = {r,g,b,a});
        // 'rgba(255, 255, 255, 0)'
    }

    /**
     * 传入需旋转到的角度  角度是在上一次旋转到的角度的积累值
     * @param{number} edg
     * @param{number} anchorX 范围是0-1之间
     * @param{number}  anchory 范围是0-1之间
     */
    rotateBy(edg){
        //移动canvas原点  旋转canvas  插入图片并移动
        this.SpiritInfo.rotateInfo.rotateNum += edg;
    }

    /**
     *
     * 传入需要旋转到的角度 角度不会积累
     * @param{number} edg
     * @param{number} anchorX 范围是0-1之间
     * @param{number}  anchory 范围是0-1之间
     */
    rotateTo(edg){
        //移动canvas原点  旋转canvas  插入图片并移动
        this.SpiritInfo.rotateInfo.rotateNum = edg;

    }

    /**
     * 取到当精灵的旋转角度的度数
     * @returns {number}
     */
    getRotateNum(){
        return parseInt(this.SpiritInfo.rotateInfo.rotateNum);
    }

    /**
     *
     * 确定图签的位置
     * @param{number} positionX x坐标
     * @param{number} positionY y坐标
     */
    position(positionX,positionY){

        this.x = positionX;
        this.y = positionY;

        // console.log('调取-----'.this.positionChiled);
        // super.positionChiled(positionX,positionY);

    }

    /**
     * 设置图片在canvas上的大小
     * @param{number} scaleX
     * @param{number} scaleY
     */
    scale(scaleX,scaleY){
        this.scaleW = scaleX;
        this.scaleH = scaleY;

    }

    /**
     * 绘出图片
     */
    drawResObj(){

        if(this.setActiveState === false){
            return;
        }
        this.imageW = this.img.width*this.SpiritInfo.imageScaleNum;
        this.imageH = this.img.height*this.SpiritInfo.imageScaleNum;





        this.context.save();

        let x_=this.x*window.remscale + this.imageW*this.SpiritInfo.anchorInfo.anchorX ;//算出需要移动的位置
        let y_=this.y*window.remscale + this.imageH*this.SpiritInfo.anchorInfo.anchorY ;//算出需要
        // let x_=this.x*window.remscale + this.imageW*this.SpiritInfo.anchorInfo.anchorX -(this.imageW*(1-this.scaleW)*this.SpiritInfo.anchorInfo.anchorX) ;//算出需要移动的位置
        // let y_=this.y*window.remscale + this.imageH*this.SpiritInfo.anchorInfo.anchorY -(this.imageH*(1-this.scaleH)*this.SpiritInfo.anchorInfo.anchorY);//算出需要移动的位置
        let r_ = this.SpiritInfo.rotateInfo.rotateNum * Math.PI / 180;
        this.context.translate(x_,y_);
        this.context.scale(this.scaleW,this.scaleH);//方法缩小
        this.context.rotate(r_);//旋转
        // this.context.fillStyle =`rgba(${this.SpiritInfo.color.r},${this.SpiritInfo.color.g},${this.SpiritInfo.color.b},${this.SpiritInfo.color.a})`;
        this.context.globalAlpha = this.alphaNum;
        this.context.translate(-x_,-y_);

        this.context.drawImage(
            this.img,
            this.x*window.remscale,
            this.y*window.remscale,
            this.imageW,//展示出来图片的宽
            this.imageH ,//展示出来图片的高
        );
        // this.context.fillStyle = 'rgba(255,255,255,10)';
        // this.context.rect(this.x*window.remscale,this.y*window.remscale,100,100);
        // this.context.stroke();
        // this.context.drawImage(
        //     this.img,
        //     0,
        //     0,
        //     this.img.width,
        //     this.img.height,
        //     // this.x*window.remscale-(this.imageW*(1-this.scaleW)*this.SpiritInfo.anchorInfo.anchorX),
        //     // this.y*window.remscale-(this.imageH*(1-this.scaleH)*this.SpiritInfo.anchorInfo.anchorY),
        //     this.x*window.remscale,
        //     this.y*window.remscale,
        //     this.imageW,
        //     this.imageH
        // );

        this.context.restore();

    }



    /**
     * 隐藏或者显示某个精灵
     * @param{boolean} state
     * @param{string} spritKey
     */
    setActive(state){
        if(state === true){
            this.setActiveState = state;
        }else if(state === false){
            this.setActiveState = state;
        }
    }
    //场景中彻底删除本游戏物体
    remove(){

        this.destroy();
    }
    /**
     * 销毁游戏体
     */
    destroy(){
        Game.deleteObj(this.spritName);
    }
    //--------------动画部分------------
    /**
     * 动画的方法 由快倒慢
     * @param{number} targetX
     * @param{number} targetY
     * @param{number} easing 比例系数  比例系数越小速度越慢
     * @param{function} BACKFUN 回调函数
     * @constructor
     */
    DoEaseOutMove(targetX,targetY,easing,BACKFUN){

        if(this.setActiveState === false){
            return;
        }

        targetX==0 ? targetX=1: targetX=targetX;
        targetY==0 ? targetY=1: targetY=targetY;
        //目的为了只调取一次回调函数
        if(this.SpiritInfo.animationinfo.moveState !==0){
            return;
        }

        this.x += (targetX - this.x) * easing;
        this.y += (targetY - this.y) * easing;
        let distance = Math.sqrt(Math.pow(targetX - this.x,2) +Math.pow( targetY - this.y,2));
        //回调函数
        if(distance<=1){
            this.SpiritInfo.animationinfo.moveState = -1;
            BACKFUN();
        }
    }



    /**
     * 来回的运动 匀速
     * @param{number} targetX
     * @param{number} targetY
     * @param{number} spring
     * @param{function} BACKFUN
     * @constructor
     */
    DoEaseInMoveForever(targetX,targetY,spring,BACKFUN){
        if(this.setActiveState === false){
            return;
        }

        targetX==0 ? targetX=1: targetX=targetX;
        targetY==0 ? targetY=1: targetY=targetY;


        this.SpiritInfo.EaseOutMove.vx += (targetX - this.x) * spring;
        this.SpiritInfo.EaseOutMove.vy += (targetY - this.y) * spring;
        this.x +=this.SpiritInfo.EaseOutMove.vx;
        this.y +=this.SpiritInfo.EaseOutMove.vy;

    }
    //--------------------放大缩小的函数--------------
    /**
     *往返的放大缩小
     * @param targetX
     * @param targetY
     * @param spring
     * @constructor
     */
    DoEaseInscaleForever(targetX,targetY,spring){

        if(this.setActiveState === false){
            return;
        }

        if(targetX === 0 && targetY === 0){
            return;
        }
        this.SpiritInfo.scaleInfo.EaseIn.vx += (targetX - this.scaleW) * spring;
        this.SpiritInfo.scaleInfo.EaseIn.vy += (targetY - this.scaleH) * spring;
        this.scaleW +=this.SpiritInfo.scaleInfo.EaseIn.vx;
        this.scaleH +=this.SpiritInfo.scaleInfo.EaseIn.vy;

    }

    /**
     * 放大缩小一次
     * @param targetX
     * @param targetY
     * @param spring
     * @constructor
     */
    DoEaseOutBtnScale(targetX,targetY,spring,repeatNum){


        if(this.setActiveState === false){
            return;
        }

        if(targetX === 0 && targetY === 0){
            return;
        }



        this.SpiritInfo.scaleInfo.EaseIn.vx += (targetX - this.scaleW) * spring;
        this.SpiritInfo.scaleInfo.EaseIn.vy += (targetY - this.scaleH) * spring;
        this.scaleW +=this.SpiritInfo.scaleInfo.EaseIn.vx;
        this.scaleH +=this.SpiritInfo.scaleInfo.EaseIn.vy;

    }
    //-----------------旋转的函数---------------------
    /**
     * 旋转的函数
     * @param roateNum
     * @param spring
     * @param BACKFUN
     * @constructor
     */
    DoEaseInRoateForever(roateNum,spring,BACKFUN){

        if(this.setActiveState === false){
            return;
        }
        // console.log('BACKFUN',BACKFUN);
        //检测是不是旋转到了相关的状态了
        this.SpiritInfo.rotateInfo.easeIn.roateNum += (roateNum - this.SpiritInfo.rotateInfo.easeIn.roateNum) * spring;
        this.SpiritInfo.rotateInfo.rotateNum = this.SpiritInfo.rotateInfo.easeIn.roateNum;
        if(roateNum === this.SpiritInfo.rotateInfo.rotateNum){
            if(BACKFUN!==undefined && BACKFUN!==null){
                BACKFUN();
            }

        }
    }

    /**
     * 传入相关的一个参数
     * @param{number} targetNum 0-1之间的浮点数
     * @param{number} spring 速度 建议从0.01开始
     * @constructor
     */
    DoEaseInAlphaForever(targetNum,spring){
        if(this.setActiveState === false){
            return;
        }

        this.SpiritInfo.alpha +=(targetNum-this.alphaNum)*spring;
        this.alphaNum +=this.SpiritInfo.alpha;


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
        // console.log('element:',element);
        // console.log('event:',event);
        // eslint-disable-next-line no-param-reassign
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
        //比例进行矫正
        let btnObj={
            x:this.x*window.remscale,
            y:this.y*window.remscale,
        };
        e.x = e.x*window.remscale;
        e.y = e.y*window.remscale;

        let lfetX_ = btnObj.x + (this.img.width*this.SpiritInfo.imageScaleNum);
        let rightY_ = btnObj.y  + (this.img.height*this.SpiritInfo.imageScaleNum);

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
        gameInfo.canvas.addEventListener('click',e=>{
            if(this.isClick(this.getPoint(gameInfo.canvas,e)) === true){
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

        $(gameInfo.FindCanvas).on('touchstart',  (event) => {
            if(this.isClick(this.getPoint(gameInfo.canvas,event.changedTouches[event.changedTouches.length-1])) === true){
                BACKFUN();
            }
        });

    }
    /**
     * 为了精灵添加点鼠标抬起件事件
     * @param BACKFUN 回调函数
     */
    addEventUp(BACKFUN){

        $(gameInfo.FindCanvas).on('touchend',  (event) => {
            if(this.isClick(this.getPoint(gameInfo.canvas,event.changedTouches[event.changedTouches.length-1])) === true){
                BACKFUN();
            }
        });

    }
}
// $(canvas).on('touchstart', function (event) {
//     if (self.guacard.preventTouch) {return};
//     self.eventDown(event)
// })
// $(canvas).on('touchmove', function (event) {
//     if (self.guacard.preventTouch) {return};
//     self.eventMove(event,ctx)
// })
// $(canvas).on('touchend', function (event) {
//     if (self.guacard.preventTouch) {return};
//     self.eventUp(event)
//     self._statisticsCon(true)
//     self.awardtimes()
// })