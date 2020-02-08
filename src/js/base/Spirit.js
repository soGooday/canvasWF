import {Game} from './Game';
import {Behaviour} from './Behaviour';


export class Spirit extends Behaviour{
    //初始化将相关的数据取到
    constructor(context,img,ID){
        super();

        this.TypeName = 'Spirit';//物体类名字型
        this.remscale = window.remscale;//缩放的大小参数 
        this.activeState = true;//画图 
        this.objectID = ID;


        //相关的参数
        this.SpiritInfo={};
        //数据的通用区域
        this.context = context;
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.scaleW=1;//对canvas的放大缩小width
        this.scaleH=1;//对canvas的方法缩小height
        this.scale={//暂时并未使用
            x:1,
            y:1,
        }
        this.rotate=0;//旋转的角度 
        this.width = this.img.width*this.remscale; 
        this.height = this.img.height*this.remscale; 
        this.anchor={
            x:0.5,
            y:0.5,
        }
        this.color={ //默认是不透明的白色
            r:255,
            g:255,
            b:255,
            a:255,  
        },  
        this.alpha = 1;//透明度  

        //本组件的相关参数的设计
        this.initData(context,img,ID);
    }
    /**
     * 初始化相关的信息
     */
    initData(context,img,ID){
        this.setScale(1,1);  
    } 
    
    /**
     * 取到唯一标示
     * @returns {*}
     */
    getSpritMarkName(){
        return this.objectID;
    } 

    //取出来精灵的名字是什么
    getSpiritName(){
        return this.objectID;
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
            width:this.width,
            height:this.height,
        }
        return ObjWHInfo;
    }

    /**
     * 确定这个图片的锚点在哪里 现在只适用于旋转的锚点设置 移动的锚点正在添加ing
     * @param{number} anchorX 左边->右边（0-1）传进来的是小数
     * @param{number} anchorY 上边->下边（0-1）传进来的是小数
     */
    setAnchor(x,y){
        (this.anchor={x,y});
        return this;
    }

    /**
     * 设置精灵的透明度
     * @param{number} num 范围 0-1
     */
    setAlpha(num){
        this.alpha = num;
        return this; 
    } 

    /**
     * 设置颜色
     * @param{number} r 范围 0-255
     * @param{number} g 范围 0-255
     * @param{number} b 范围 0-255
     * @param{number} a 范围 0-255
     */
    setColor(r,g,b,a){
        (this.color = {r,g,b,a});
        return this; 
    } 

    /**
     * 传入需旋转到的角度  角度是在上一次旋转到的角度的积累值
     * @param{number} edg
     * @param{number} anchorX 范围是0-1之间
     * @param{number}  anchory 范围是0-1之间
     */
    setRotateBy(edg){
        //移动canvas原点  旋转canvas  插入图片并移动
        this.rotate += edg;
        return this;
    }

    /**
     *
     * 传入需要旋转到的角度 角度不会积累
     * @param{number} edg
     * @param{number} anchorX 范围是0-1之间
     * @param{number}  anchory 范围是0-1之间
     */
    setRotateTo(edg){
        //移动canvas原点  旋转canvas  插入图片并移动
        this.rotate = edg;
        return this;
    }

    /**
     * 取到当精灵的旋转角度的度数
     * @returns {number}
     */
    getRotateNum(){
        return parseInt(this.rotate);
    }

    /**
     *
     * 确定图签的位置
     * @param{number} positionX x坐标
     * @param{number} positionY y坐标
     */
    setPosition(positionX,positionY){ 
        this.x = positionX;
        this.y = positionY;
        return this;  
    }

    /**
     * 设置图片在canvas上的大小
     * @param{number} scaleX
     * @param{number} scaleY
     */
    setScale(scaleX,scaleY){
        this.scaleW = scaleX;
        this.scaleH = scaleY;
        return this;
    }

    /**
     * 隐藏或者显示某个精灵
     * @param{boolean} state
     * @param{string} spritKey
     */
    setActive(state){
        if(state === true){
            this.activeState = state;
        }else if(state === false){
            this.activeState = state;
        }
    }

    /**
     * 销毁游戏体
     */
    remove(){
        this.destroy();
    }
    
    /**
     * 销毁游戏体
     */
    destroy(){
        Game.deleteObj(this.objectID);
    }

    /**
     * 绘出图片
     */
    drawResObj(){ 
        if(this.activeState === false){
            return;
        }
        this.width = this.img.width*this.remscale;
        this.height = this.img.height*this.remscale;
 
        this.context.save(); 
        let x_=this.x*this.remscale + this.width*this.anchor.x ;//算出需要移动的位置
        let y_=this.y*this.remscale + this.height*this.anchor.y ;//算出需要
 
        let r_ = this.rotate * Math.PI / 180;
        this.context.translate(x_,y_);
        this.context.scale(this.scaleW,this.scaleH);//方法缩小
        this.context.rotate(r_);//旋转
      
        this.context.globalAlpha = this.alpha;
        this.context.translate(-x_,-y_);
        //这个是简短的绘制图标的方式
        this.context.drawImage(
            this.img,
            this.x*this.remscale,
            this.y*this.remscale,
            this.width,//展示出来图片的宽
            this.height ,//展示出来图片的高
        ); 
        ///这个是可以实现雪碧图的更多绘制的方式
        // this.context.drawImage(
        //     this.img,
        //     0,
        //     0,
        //     this.img.width,
        //     this.img.height, 
        //     this.x*window.remscale - this.height*this.anchor.x,
        //     this.y*window.remscale - this.height*this.anchor.y,
        //     this.width,
        //     this.height
        // );  
        this.context.restore();

    }



 
  


}
