
import {Game, gameInfo} from '../base/Game';
import {Collision} from '../base/Collision';
//继承自精灵
export class SingleObj {
    constructor(positionX,positionY,spriteKey){


        this.positionX =positionX;
        this.positionY =positionY;


        this.spriteKey =spriteKey;
        //做出球
        this.transform = Game.createSpriteS(this.positionX,this.positionY,this.spriteKey);

        this.spritName = this.transform.spritName;
        //蛋的移动

        this.backFun = null;

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

        //将创建出来的图片xy的值取到
        this.x = this.transform.x;//坐标
        this.y = this.transform.y;//坐标
        this.scaleW = this.transform.scaleW;//大小
        this.scaleH = this.transform.scaleH;//大小
        this.width = this.transform.imageW;//高
        this.height = this.transform.imageH;//高
        this.noceCollierState = false;//是否置碰撞一次
        // this.transform.call(this);

        return this;
    }

    /**
     * 设置移动的路径
     * SnailMove[0] 目标x  [1]目标y [2]系数
     * FastMove[0] 第一个目标x  [1]第一个目标y  [2]第二个目标x  [3]第二个目标y  [2]第三个目标x  [3]第三个目标y  [6]系数
     * @param[arry] SnailMove
     * @param[arry] FastMove
     * @param[number] piongBool 循环次数 小于等0是无线循环
     * @param[funtion ] piongBool 循环次数 小于等0是无线循环
     */
    setAnimation(SnailMove,FastMove,repeatNum,ABCKfUN){


        this.SnailMoveX = SnailMove[0] ;
        this.SnailMoveY = SnailMove[1] ;
        this.SnailMoveS = SnailMove[2]  ;
        this.backFun = ABCKfUN;

        this.SnailMoveXB = SnailMove[0] ;
        this.SnailMoveYB = SnailMove[1]  ;
        this.SnailMoveSB = SnailMove[2] ;

        if(FastMove === undefined)
            return;


        let  vx1=this.getEveryAddNum(FastMove[0],this.positionX ,FastMove[6]);
        let  vy1=this.getEveryAddNum(FastMove[1],this.positionY ,FastMove[6]);

        let  vx2=this.getEveryAddNum(FastMove[2],FastMove[0],FastMove[6]);
        let  vy2=this.getEveryAddNum(FastMove[3],FastMove[1],FastMove[6]);

        let  vx3=this.getEveryAddNum(FastMove[4],FastMove[2],FastMove[6]);
        let  vy3=this.getEveryAddNum(FastMove[5],FastMove[3],FastMove[6]);

        //取到三个点之间的
        this.fastMoveInfo={
            frist:{
                x:FastMove[0],
                y:FastMove[1],
                vx:vx1,//差值
                vy:vy1,//差值
            },
            second:{
                x:FastMove[2],
                y:FastMove[3],
                vx: vx2,//差值
                vy: vy2,//差值
            },
            third:{
                x:FastMove[4],
                y:FastMove[5],
                vx:vx3,//差值
                vy:vy3,//差值
            },
            timeNum:FastMove[6],
            numAnima:1,//当前是第几段的动画 1  2  3
            repeatTopNum:repeatNum,//循环的次数 小于等0是无线循环
            repeatNum:0,///记录循环的次数

        };

    }
    //设置目标 与速度
    setLinearAnimation(targetX,targetY,spring){

        this.LinearAn={
            vx:this.getEveryAddNum(targetX,this.positionX ,spring),
            vy:this.getEveryAddNum(targetY,this.positionX ,spring),
            spring,
        };
        // this.LinearAn={
        //     vx:this.getEveryAddNum(targetX,this.positionX ,spring),
        //     vy:this.getEveryAddNum(targetY,this.positionX ,spring),
        //     spring,
        // };
    }

    /**
     * 回归之前的数据  防止运动动画出现问题
     */
    initPosition(){
        //初始化坐标

        this.position(this.positionX,this.positionY);
        //初始化直线运动出具
        this.SnailMoveX =  this.SnailMoveXB;
        this.SnailMoveY = this.SnailMoveYB;
        this.SnailMoveS = this.SnailMoveSB;

        //初始化旋转次数
        // this.fastMoveInfo.repeatNum = 0;

        this.objScaleInfo.targetW =  this.objScaleInfo.targetWB;
        this.objScaleInfo.targetH = this.objScaleInfo.targetHB;



    }

    /**
     * 设置玩家的得到扭蛋的相关的参数
     * @param bornPosition
     * @param goalPosition
     */
    setplayerGetEggAnian(bornPosition,goalPosition,timeNum){
        if(bornPosition instanceof Array && goalPosition  instanceof Array){
            this.getEggBornPosition = bornPosition;
            this.getEgggGoalPosition = goalPosition;
            this.getEgggBorntimeNum = timeNum;
        }

    }

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
     * 运动的参数是什么 1正常来回  2快速的三种运动牛扭蛋机 3是弹簧与猴子往回索
     * @param type
     */
    moveAnimation(type){
        if(type === 1 ){
            this.slowMove();
        }else if(type === 2 ){
            this.fastMove();
        }
    }

    /**
     * 正常移动的方法
     */
    slowMove(){
        this.transform.DoEaseInMoveForever(this.SnailMoveX,this.SnailMoveY,this.SnailMoveS,()=>{
            console.log('运动完毕');
        });

    }

    /**
     * 快速移动的方法
     */
    fastMove(){
        //检测使用次数
        if(this.fastMoveInfo.repeatTopNum>0){
            if(this.fastMoveInfo.repeatNum>=this.fastMoveInfo.repeatTopNum){
                return;
            }
        }
        if(this.fastMoveInfo.numAnima === 1){
            this.boxMoveToGold(this.fastMoveInfo.frist.vx,this.fastMoveInfo.frist.vy);
            if(this.getdistance(this.transform.x - this.fastMoveInfo.frist.x,this.transform.y -this.fastMoveInfo.frist.y)<=3){
                this.fastMoveInfo.numAnima = 2;
            }
        }else if(this.fastMoveInfo.numAnima === 2){

            this.boxMoveToGold(this.fastMoveInfo.second.vx,this.fastMoveInfo.second.vy);
            if(this.getdistance(this.transform.x - this.fastMoveInfo.second.x,this.transform.y -this.fastMoveInfo.second.y)<=3){
                this.fastMoveInfo.numAnima = 3;
            }
        }else if(this.fastMoveInfo.numAnima === 3){
            this.boxMoveToGold(this.fastMoveInfo.third.vx,this.fastMoveInfo.third.vy);
            if(this.getdistance(this.transform.x - this.fastMoveInfo.third.x,this.transform.y -this.fastMoveInfo.third.y)<=3){
                this.fastMoveInfo.numAnima = 1;
                this.fastMoveInfo.repeatNum++;
                //检测条件到了
                if(this.fastMoveInfo.repeatNum>=this.fastMoveInfo.repeatTopNum){
                    if(this.backFun!==null&&this.backFun!==undefined){
                        this.backFun();//开始回调
                    }
                }
            }
        }
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

    /**
     * 设线性运动
     */
    linearAimation() {
        this.boxMoveToGold(this.LinearAn.vx, this.LinearAn.vy, this.LinearAn.spring);

    }
    /**
     * 得到目标点与本对象的坐标距离
     * @param x_
     * @param y_
     * @returns {number}
     */
    getdistance(x_,y_){
        let distance = Math.sqrt(Math.pow(x_,2) +Math.pow( y_,2));
        return distance;
    }

    /**
     * 得到每次坐标的自增变量差值
     * @param gx
     * @param nx
     * @param updataNum
     * @returns {number}
     */
    getEveryAddNum(gx,nx,updataNum){
        let num= 0;
        if(gx>=nx){
            num = (gx-nx)/updataNum;
        }else {
            num = (gx-nx)/updataNum;
        }
        return num;
    }

    /**
     * 移动将本物体移动起来
     * @param vx
     * @param vy
     */
    boxMoveToGold(vx,vy){
        this.transform.x+=vx;
        this.transform.y+=vy;
    }

    /**
     * 打开过着关系图片
     * @param{boolean} state
     */
    setActive(state){
        this.transform.setActive(state);
    }

    scale(width,higth){
        this.transform.scale(width,higth);
    }

    /**
     * 设置位置
     * @param{positionX} positionX
     * @param{positionY} positionY
     */
    position(positionX,positionY){
        this.transform.position(positionX,positionY);
    }

    //取出来精灵的名字是什么
    getSpiritName(){
        return this.transform.getSpiritName();
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
        this.transform.rotateTo(edg);

    }

    //场景中彻底删除本游戏物体
    remove(){

        this.transform.remove();

    }

    /**
     * 设置名字
     * @param name_
     */
    makeSpritMarkName(name_){

        this.transform.makeSpritMarkName(name_);
    }
    getSpritMarkName(){

        return this.transform.getSpritMarkName();
    }

    /**
     * 按钮事件
     * @param BACKFUN
     */
    addEventClick(BACKFUN){
        this.transform.addEventClick(BACKFUN);
    }
    /**
     * 为了精灵添加点鼠标按下的事件
     * @param BACKFUN 回调函数
     */
    addEventDown(BACKFUN){
        this.transform.addEventDown(BACKFUN);
    }
    /**
     * 为了精灵添加点鼠标抬起件事件
     * @param BACKFUN 回调函数
     */
    addEventUp(BACKFUN){
        this.transform.addEventUp(BACKFUN);
    }
    /**
     * 为了精灵添加点鼠标悬浮的事件
     * @param BACKFUN 回调函数
     */
    addEventSuspension(BACKFUN){
        this.transform.addEventSuspension(BACKFUN);

    }
    /**
     * 取到坐标
     */
    getPosition(){
        return this.transform.getPosition();
    }

    /**
     * 取到物体的宽与高
     */
    getObjWH(){
        return this.transform.getObjWH();
    }

    /**
     * 打开碰撞状态 或者关闭 修改碰撞状态
     * @param bool_
     */
    setCollierState(bool_){
        this.noceCollierState = bool_;
    }

    /**
     * 打开碰撞状态
     */
    openCollierState(){
        this.noceCollierState = false;
    }
    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{bodyA{x,y,width,height}} bodyA
     * @param{bodyB{x,y,width,height}}  bodyB
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    onCollisiOnce(body,BACK){
        //碰撞已经检测过了 就不在检测碰撞了
        if(this.noceCollierState === true){
            return;
        }


        let bodyA={
            x:this.getPosition().x,
            y:this.getPosition().y,
            width:this.getObjWH().width,
            height:this.getObjWH().height,
        };
        if(Collision.onCollision(bodyA,body) === true){
            //修改碰撞状态
            this.setCollierState(true);
            //碰撞到了之后 将这个游戏体返回去
            if(BACK){
                BACK(this);
            }
        }
    }


}