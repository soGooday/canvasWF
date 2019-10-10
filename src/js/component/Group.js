
import {Collision} from '../base/Collision';

export class Group {
    constructor(){
        this.TypeName = 'Group';
        //建立组的设置
        this.groupSet = new Set();
        this.x = 0;
        this.y = 0;
        return this;
    }

    /**
     * 加入元素
     * @param obj
     */
    add(obj){
        this.groupSet.add(obj);
        return this;

    }

    /**
     *查询出数量
     */
    size(){
        return this.groupSet.size;

    }

    /**
     * 删除元素
     * @param obj
     */
    delete(obj){
        this.groupSet.delete(obj);
        return this;
    }

    /**
     * 传入的x y的数值
     * @param{number} positionX
     * @param{number} positionY
     */
    position(positionX,positionY){
        this.x = positionX;
        this.y = positionY;
        //循环大小
        for (let item of this.groupSet.values()) {
            item.position(item.x + positionX, item.y + positionY);
        }
    }

    /**
     * 回国初始化的相关的位置
     */
    initPosition(){
        for (let item of this.groupSet.values()) {
            item.initPosition();
        }
    }
    /**
     * 碰撞检测方法  如果返回true，
     * 传入的格式
     * @param{bodyA{x,y,width,height}} bodyA
     * @param{bodyB{x,y,width,height}}  bodyB
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    onCollisiOnce(body,BACK){
        for (let item of this.groupSet.values()) {
            item.onCollisiOnce(body,BACK);
        }
    }

    /**
     * 取到组中的相关的数据
     * @returns {Set<any>}
     */
    getGroupList(){
        return this.groupSet;
    }

    /**
     * 取到坐标
     */
    getPosition(){
        let positionInfo={
            x:this.x,
            y:this.y,
        };
        return positionInfo;
    }
}