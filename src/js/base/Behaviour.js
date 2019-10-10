//基础类 一些基础组件需要继承自这个
export class Behaviour {
    constructor(){
        this.TypeName = 'Behaviour';






    }


    //
    // /**
    //  * 回归之前的数据  防止运动动画出现问题
    //  */
    // initPosition(){
    //     // //初始化坐标
    //     // this.transform.x =this.positionX;
    //     // this.transform.y = this.positionY;
    //     //
    //     // //初始化直线运动出具
    //     // this.SnailMoveX =  this.SnailMoveXB;
    //     // this.SnailMoveY = this.SnailMoveYB;
    //     // this.SnailMoveS = this.SnailMoveSB;
    //
    //     //初始化旋转次数
    //     // this.fastMoveInfo.repeatNum = 0;
    //
    //     this.objScaleInfo.targetW =  this.objScaleInfo.targetWB;
    //     this.objScaleInfo.targetH = this.objScaleInfo.targetHB;
    //
    // }

    // initData(obj){
    //
    //     this.parents = obj;
    //     //自物体的set数组 用于处理
    //     console.log('chuan111---',this);
    // }
    //
    //
    //
    //
    // /**
    //  * 加入childe 子元素
    //  * @param{} childeObj
    //  */
    // addChiled(childeObj){
    //     this.childList.add(childeObj);
    //     return this;
    // }
    //
    // /**
    //  * 加入子列表
    //  * @returns {number}
    //  */
    // size(){
    //     return this.childList.size;
    // }
    //
    // /**
    //  * 传入相关的要移除的子元素
    //  * @param childeObj
    //  */
    // deleteChiled(childeObj){
    //     if(this.childList.has(childeObj)){
    //         this.childList.delete(childeObj);
    //     }else {
    //         console.error(this.parents,'并不含有',childeObj,'的子元素');
    //     }
    //
    // }
    //
    // /**
    //  * 子元素的移动
    //  * @param positionX
    //  * @param positionY
    //  */
    // positionChiled(positionX,positionY){
    //
    //     //循环大小
    //     for (let item of this.groupSet.values()) {
    //         item.position(item.x + positionX, item.y + positionY);
    //     }
    // }
    //


}