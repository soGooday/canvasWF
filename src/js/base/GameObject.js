export default class GameObject{
    constructor(){
        this.transform={
            scale:{//放大缩小
                x:1,
                y:1
            },
            position:{//坐标的位置
                x:0,
                y:0,
            },
            roate:0,//旋转的角度
            width:10,//宽
            height:10,//高
            alphaNum:1,//透明度
        }
    }
    
}