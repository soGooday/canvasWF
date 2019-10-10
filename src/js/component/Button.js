

import {Game} from '../base/Game';

export class Button {

    constructor(positionX,positionY,spriteKey){

        this.positionX =positionX;
        this.positionY =positionY;


        this.spriteKey =spriteKey;
        //做出球
        this.transform = Game.createSpriteS(this.positionX,this.positionY,this.spriteKey);
        this.scoleY_W = this.transform.scaleW;//记录原大小
        this.scoleY_H = this.transform.scaleH;//记录原大小
        this.scaleInof={
            ScaleTargetNum:1,//目标比值大小
            scaleReqseatNum:1,//次数
            scaleSpringNum:0,//速度的
            scaleState:0,
            lastNum:0,//动画中需要的中间数
            openScaleAnim:false,///状态
        };


        this.ScaleTargetNum = 0;
        this.scaleReqseatNum = 0;
        this.scaleSpringNum = 0;

    }

    /**
     *
     * @param{number} ScaleTargetNum 传入的是比值  大于1 是放大 小于1 是缩小
     * @param{number} springNum 传入的是速度
     * @param{number} scaleReqseatNum 执行几次
     */
    setScaleAnimation(ScaleTargetNum,springNum,scaleReqseatNum){
        this.ScaleTargetNum = ScaleTargetNum;
        this.scaleSpringNum = scaleReqseatNum;

        this.scaleInof.ScaleTargetNum = ScaleTargetNum;
        this.scaleInof.scaleReqseatNum = scaleReqseatNum;
        this.scaleInof.scaleSpringNum = springNum;
        this.scaleInof.openScaleAnim = true;




    }
    initScaleAnimation(){
        this.scaleInof.ScaleTargetNum = this.ScaleTargetNum;
        this.scaleInof.scaleSpringNum = this.scaleSpringNum;
        this.scaleInof.scaleState = 0;
        this.transform.scale(this.scoleY_W,this.scoleY_H);

    }

    addEventClick(BACKFUN){
        this.transform.addEventClick(BACKFUN);
    }
    DoScaleAnimation(){
        if(this.scaleInof.openScaleAnim === false)
            return;



        this.scaleInof.lastNum += (this.scaleInof.ScaleTargetNum - this.transform.scaleW) * this.scaleInof.scaleSpringNum;

        this.transform.scaleW +=this.scaleInof.lastNum;
        this.transform.scaleH +=this.scaleInof.lastNum;



        if(this.transform.scaleW <=this.scaleInof.ScaleTargetNum){
            this.scaleInof.scaleState = 1;

        }
        if(this.scaleInof.scaleState === 1 && (this.transform.scaleW >= this.scaleInof.ScaleTargetNum)){
            this.scaleInof.openScaleAnim = false;
            console.log('-----');
            this.initScaleAnimation();
        }


    }

    /**
     * 传入目标值 得到自己与目标的差值
     * @param ScaleTargetNum
     * @param springNum
     * @returns {number}
     */
    getSpringNum(ScaleTargetNum,springNum){

        //取到当前的差值
        return (ScaleTargetNum - this.transform.scaleW)/springNum;

    }

    /**
     * 显示 或者吟唱按钮
     * @param{boolean} bool_
     */
    setActive(bool_){
        this.transform.setActive(bool_);
    }
}