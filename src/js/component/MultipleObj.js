
import {SingleObj} from './SingleObj';

export class MultipleObj {
    constructor(positionX,positionY,scaleNum,keyName_1,keyName_2,keyName_3){

        this.makeBox(positionX,positionY,scaleNum,keyName_1,keyName_2,keyName_3);

    }
    //可以修改为异步加载 后面做完优化
    makeBox(positionX,positionY,scaleNum,keyName_1,keyName_2,keyName_3){
        //笔记发现使用了异步之后速度反而慢了些 所以还是使用的单线程
        // let self = this;
        // self.promiseMake(positionX,positionY,keyName_1).then((V)=>{
        //     self.objList.top =V;
        //     this.objList.top.scale(scaleNum,scaleNum);
        // });
        // this.top.transform.scale(scaleNum,scaleNum);

        this.top =new SingleObj(positionX,positionY,keyName_2);
        this.top.scale(scaleNum,scaleNum);
        this.below =new SingleObj(positionX,positionY,keyName_1);
        this.below.scale(scaleNum,scaleNum);
        this.middle =new SingleObj(positionX,positionY,keyName_3);
        this.middle.scale(scaleNum,scaleNum);

    }
    //异步创建多个图片组成的物体
    promiseMake(positionX,positionY,keyName_1){
        return new Promise(function(resolve, reject) {
            let  sp_ = null;
            sp_ = new SingleObj(positionX,positionY,keyName_1);
            if (sp_ !== null){
                resolve(sp_);
            } else {
                reject(null);
            }
        });

    }
    /**
     * [0] 目标x  [1]目标y [2]系数
     * @param[arry] SnailMove
     */
    setAnimation(SnailMove,FastMove,repeatNum,BACKFUN){
        this.top.setAnimation(SnailMove,FastMove,repeatNum);
        this.below.setAnimation(SnailMove,FastMove,repeatNum);
        this.middle.setAnimation(SnailMove,FastMove,repeatNum,BACKFUN);

    }
    //移动的动画开始
    /**
     * 运动的参数是什么 1正常来回  2快速的移动
     * @param type
     */
    moveAnimation(type){
        if(type === 1 ){
            this.top.slowMove();
            this.below.slowMove();
            this.middle.slowMove();
        }else if(type === 2 ){
            this.top.fastMove();
            this.below.fastMove();
            this.middle.fastMove();
        }

    }

    /**
     * 位置回国初始化
     */
    initPosition(){
        this.top.initPosition();
        this.below.initPosition();
        this.middle.initPosition();
    }

    /**
     * 打开过着关系图片
     * @param{boolean} state
     */
    setSctive(state){
        this.top.setSctive(state);
        this.below.setSctive(state);
        this.middle.setSctive(state);
    }

    /**
     * 传入设置宽高
     * @param{number} width
     * @param{number} higth
     */
    scale(width,higth){
        this.top.scale(width,higth);
        this.below.scale(width,higth);
        this.middle.scale(width,higth);
    }

    /**
     * 添加旋转的参数
     * @param{number} rotateNum
     * @param{number} spring
     */
    setRoateAnimation(rotateNum,timeSpring,BACKFUN){

        this.top.setRoateAnimation(rotateNum,timeSpring);
        this.below.setRoateAnimation(rotateNum,timeSpring);
        this.middle.setRoateAnimation(rotateNum,timeSpring);

    }

    /**
     * 使用旋转的动画方法
     */
    roateAnimation(){
        this.top.roateAnimation();
        this.below.roateAnimation();
        this.middle.roateAnimation();
    }

    //取到这个组合精灵的名字
    getSpiritName(){
        return this.middle.getSpiritName();
    }

    /**
     * 设置位置
     * @param{positionX} positionX
     * @param{positionY} positionY
     */
    position(positionX,positionY){
        this.top.position(positionX,positionY);
        this.below.position(positionX,positionY);
        this.middle.position(positionX,positionY);

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
        this.top.rotateTo(edg);
        this.below.rotateTo(edg);
        this.middle.rotateTo(edg);
    }

    //场景中彻底删除本游戏物体
    remove(){
        this.top.remove();
        this.below.remove();
        this.middle.remove();

    }

    /**
     * 起一个唯一的标示 用于辨认
     * @param name_
     */
    makeSpritMarkName(name_){

        this.middle.makeSpritMarkName(name_);
    }
    getSpritMarkName(){
        return this.middle.getSpritMarkName();
    }
}