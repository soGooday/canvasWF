export default class GameObject{
    constructor(){
        this.TypeName = 'GameObject'
        this.context = context;//上下文
        this.img = img;//图片素材

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
            color:{ //默认是不透明的白色
                r:255,
                g:255,
                b:255,
                a:255,
            }, 
            anchor:{//锚点参数
                anchorX:0.5,//锚点X坐标上的差值
                anchorY:0.5,//锚点Y坐标上的差值
            },
        }
    }


}