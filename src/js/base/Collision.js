import {Tool} from './Tool';

export class Collision {

    //建立单例
    // getInstance(){
    //     if(!this.instance){
    //         this.instance = new Collision();
    //     }
    //     return this.instance;
    // }

    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{bodyA{x,y,width,height}} bodyA
     * @param{bodyB{x,y,width,height}}  bodyB
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    static onCollision(bodyA,bodyB){
        return Tool.rectangleCollision(bodyA,bodyB);
    }


}