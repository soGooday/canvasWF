import {Game} from './Game';
import {Behaviour} from './Behaviour';


export class Spirit extends Behaviour{
    //初始化将相关的数据取到
    constructor(context,img,spritName){
        super();

        this.TypeName = 'Spirit';
        this.spritName = spritName;
        this.setActiveState = true;//画图
        this.spritMarkName = spritName;//默认是自己的名字
        this.objectID = spritName;


        //相关的参数
        this.SpiritInfo={
            imageScaleNum:window.remscale,//默认图片的基准大小
            rotateInfo:{//旋转的相关参数
                rotateNum:0,//当前相关到的多少度 
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
  


}
