import {Game} from './Game'  

/**
 * 当前组件的信息
 */
let componentInfo={
    constructor:null,//当初实力本组件的原型 
    self:null,//当前的作用域
    id:0,//当前碰撞的id
    collisionKey:'collision',//当前碰撞的id
}
export default class Collision {
    constructor(scope){
        this.TypeName ='Collision';
        componentInfo.constructor = scope;
        componentInfo.self = this; 
    }
    /**
     * 得当仅仅属于当前动画的以恶个id 因为一个活动可能动画会触发很多活动
     * @param {string} CONTEXT 
     */
    getCollisionID(CONTEXT){
        componentInfo.id ++;
        return `${CONTEXT}_${componentInfo.id}`;
    }
    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{bodyA{x,y,width,height}} bodyA 碰撞区域 A
     * @param{bodyB{x,y,width,height}}  bodyB 碰撞区域 B
     * @param{function} onBeginContactFun 
     * @param{function}  incollisionFun
     * @param{function}  onEndContactFun
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    updataCollision({bodyA,bodyB,onBeginContactFun = null,incollisionFun = null,onEndContactFun = null}){
        let INFO={
            start:false,//两个物体第一次碰触
            startFrist:false,// 
            end:false,//两个碰触的物体相互分离
            int:false,//两个物体相互重叠
            /**
             * 第一次的碰撞
             */
            onBeginContact(){ 
                if(onBeginContactFun === null){
                    return;
                }
                if(this.startFrist === false && this.start === false){
                    this.startFrist = true;
                    this.start = true; 
                    onBeginContactFun(bodyA,bodyB);
                } 
            },
            /**
             * 重叠碰撞
             */
            incollision(){
                if(incollisionFun === null){
                    return;
                }
                if(this.start === true && this.startFrist === true){
                    this.int = true; 
                    incollisionFun(bodyA,bodyB);
                } 
            },
            /**
             * 碰撞结束
             */
            onEndContactFun(){
                if(onEndContactFun === null){
                    return;
                }
                onEndContactFun(bodyA,bodyB); 
            },
            /**
             * 更新当前的状态
             */
            initStatus(){
                this.start = false;
                this.startFrist = false;
                this.end = false;
                this.int = false;
            },
            /**
             * 之前是不是精力过了碰撞
             */
            onEndStatus(){
                if(this.start === true && this.startFrist === true && this.int === true){
                    return true
                } 
                return false; 
            },
            
        }
        let collisionId = this.getCollisionID(componentInfo.collisionKey);
  
        Game.addUpdataFun(collisionId,()=> { 
         let is = componentInfo.self.rectangleCollision(bodyA.getToolData(),bodyB.getToolData());//检测是不是碰撞了 
           if(is){//检测是不是碰撞上了
                INFO.onBeginContact();
                INFO.incollision();
           }else{
               //检测是不是出现碰撞后然后离开了 这个时候调取碰撞离开的回调
                if(INFO.onEndStatus() === true){
                    INFO.onEndContactFun();
                    INFO.initStatus();
                }
           } 
        });
    

    }
    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{body{x,y,width,height}} body
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    collisionTarget(body=null){ 
        if(body.x === null || body.y === null || body.width === null || body.height === null){
            Game.waringS('参数格式:{body{x,y,width,height}},,可以有其他的参数 但是这四个参数缺一不可');
            return;
        }  
        return { 
        
            onBeginContactFun : null,//第一个碰撞回调
            incollisionFun : null,//两个相互重叠状态
            onEndContactFun : null,//相互分离开来
            bodyA:body,//当前的碰撞的目标是什么
            bodyB:componentInfo.constructor,//当前的body  
            /**
             * 当与目标物体发生第一次接触之时，才会出现回调，且只有一次
             * @param {BACK} BACK 
             */
            onBeginContact(BACK=null){
                if(BACK != null){
                    this.onBeginContactFun = BACK;//第一个碰撞回调
                }
                return this;
            },
            /**
             * 仅当与目标物体发重叠之时，才会出现引起回调，且一直会有回调
             * @param {BACK} BACK 
             */
            incollision(BACK=null){
                if(BACK != null){
                    this.incollisionFun = BACK;//第一个碰撞回调
                }
                return this;
            },
            /**
             * 当与目标物体放生分离之时，才会出现回调，且只有一次
             * @param {BACK} BACK
             */
            onEndContact(BACK=null){
                if(BACK != null){
                    this.onEndContactFun = BACK;//第一个碰撞回调
                }
                return this;
            },
            /**
             * 执行碰撞的检测
             */
            DO(){
                let info={
                    bodyA:this.bodyA,
                    bodyB:this.bodyB,
                    onBeginContactFun : this.onBeginContactFun,//第一个碰撞回调
                    incollisionFun : this.incollisionFun,//两个相互重叠状态
                    onEndContactFun : this.onEndContactFun,//相互分离开来
                } 
                componentInfo.self.updataCollision(info);
            }
        } 
    }
   
    /**
     * 点与物体的碰撞检测  （结合getPoint方法可以使用点击事件）
     * @param{body{x,y}} body  类型是numder
     * @param{number} x
     * @param{number} y
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
     pointCollision(body, x, y){
        return !(x < body.x || x > (body.x + body.width)
            || y < body.y || y > (body.y + body.height));
    }


    /**
     * 传入球返回矩形  body.x body.y body.radius  需要使用到这三个属性  可以配合rectangleCollision做碰撞检测
     * @param{body{x,y,radius}} body
     * @returns{obj} {{x: number, y: number, width: number, height: number}}
     */
    getRoundToRectangleBound(body){
        return {
            x: (body.x - body.radius),
            y: (body.y - body.radius),
            width: body.radius * 2,
            height: body.radius * 2

        };
    }

    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{bodyA{x,y,width,height}} bodyA
     * @param{bodyB{x,y,width,height}}  bodyB
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    rectangleCollision(bodyA,bodyB){
        // console.log('rectangleCollision:',bodyA,bodyB)
        return !(bodyA.x + bodyA.width < bodyB.x || 
            bodyB.x + bodyB.width < bodyA.x || 
            bodyA.y + bodyA.height < bodyB.y || 
            bodyB.y + bodyB.height < bodyA.y);
    }


}