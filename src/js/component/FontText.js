import {Behaviour} from '../base/Behaviour';
import {Game} from '../base/Game';

export class FontText {
    constructor(positionX,positionY,fontTextKey){

        this.positionX =positionX;
        this.positionY =positionY;

        this.fontTextKey =fontTextKey;
        //
        this.transform = Game.createFontS(this.positionX,this.positionY,this.fontTextKey);



        this.x = this.transform.x;
        this.y = this.transform.y;
        this.scaleW = this.transform.scaleW;//大小
        this.scaleH = this.transform.scaleH;//大小

        this.alphaNum = 1;


        //放大缩小
        this.objScaleInfo={

            targetW:0,//方法缩小到指定的倍数
            targetH:0,//放大缩小的指定的倍数
            spring:0,//速度是多少

            targetWB:0,//方法缩小到指定的倍数 备份使用 回复初始化
            targetHB:0,//放大缩小的指定的倍数 备份使用 回复初始化

        };


        this.roateInfo={//旋转的相关信息
            rotateNum:0,//旋转的角度
            timeSpring:0,//旋转的速度
        };

    }
    /**
     * 隐藏或者显示字体
     * @param{boolean} state
     * @param{string} spritKey
     */
    setActive(state){
        this.transform.setActive(state);
    }
    /**
     * 初始化相关的位置
     */
    initPosition(){
        this.transform.x = this.positionX;
        this.transform.y = this.positionY;
    }
    /**
     * 传入相关的参数来控制移动
     * @param{number} positionX
     * @param{number} positionY
     */
    position(positionX,positionY){
        this.transform.position(positionX,positionY);
    }
    /**
     * 设置精灵的透明度
     * @param{number} num 范围 0-1
     */
    alpha(num){
        this.transform.alpha(num);
        this.alphaNum = num;
        return this;
    }
    /**
     * 内容是什么
     * @param{string} content
     */
    fontContent(content){
        this.transform.fontContent(content);

        return this;
    }

    /**
     * 设置字体的大小
     * @param{number} num
     */
    fontSize(num){
        this.transform.fontSize(num);
        return this;
    }

    /**
     * 设置字体的水平模式
     * @param{start,end,left,center,right} type
     *
     */
    fontTextAlign(type){
        this.transform.fontTextAlign(type);
        return this;
    }

    /**
     * 设置字体的垂直模式
     * @param{top,bottom,middle,alphabetic,hanging } type
     *
     */
    fontTextBaseline(type){
        this.transform.fontTextBaseline(type);
        return this;
    }


    /**
     * 设置字体颜色的参数
     * @param{string} colorNum
     */
    fontColor(colorNum){
        this.transform.fontColor(colorNum);
        return this;
    }

    /**
     * 字体的类型
     * @param{normal,bold,italic} style
     *
     */
    fontStyle(style){
        this.transform.fontStyle(style);
        return this;
    }
    /**
     * 设置字体在canvas上的大小
     * @param{number} scaleX
     * @param{number} scaleY
     */
    scale(scaleX,scaleY){
        this.transform.scale(scaleX,scaleY);
    }

    //基本动画
    /**
     * 传入的是大小的倍数
     * @param{number} targetX 传入的是倍数
     * @param{number} targetY 传入的是倍数
     * @param{number} spring
     */
    setScaleAnimation(targetX,targetY,spring){
        if(targetX === 0 && targetY === 0){
            return;
        }

        this.objScaleInfo.targetWB = targetX;
        this.objScaleInfo.targetHB = targetY;

        this.objScaleInfo.targetW = targetX;
        this.objScaleInfo.targetH = targetY;
        this.objScaleInfo.spring = spring;
    }
    /**
     * 添加旋转的参数
     * @param{number} rotateNum
     * @param{number} spring
     */
    setRoateAnimation(rotateNum,timeSpring,BACKFUN){
        this.setRoateAnimation = BACKFUN;
        (this.roateInfo = {rotateNum,timeSpring});
    }
    /**
     * 开始放大缩小的动画
     */
    scaleAnimation(){
       
        this.transform.DoEaseInscaleForever(this.objScaleInfo.targetW,this.objScaleInfo.targetH,this.objScaleInfo.spring);
    }

    /**
     *旋转的方法
     */
    roateAnimation(){
        this.transform.DoEaseInRoateForever(this.roateInfo.rotateNum,this.roateInfo.timeSpring,this.setRoateAnimation);
    }


}