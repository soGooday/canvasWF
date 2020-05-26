export default 
class GameObject{
    constructor(context,id,img){
        this.TypeName = 'GameObject'
        this.context = context;//上下文
        this.objectID = id;
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
                x:0.5,//锚点X坐标上的差值
                y:0.5,//锚点Y坐标上的差值
            },
            alpha : 1,//透明度  
        }
        //将数据进行代理 放在this上一个
        this.observer(this.transform);  
    }


    /**
     * 传入当前的data 并对类型进行处理
     * @param data
     */
    observer(data){
        if(!data || typeof data !== 'object' || data === null ){
            return
        }
        //数据代理 
        Object.keys(data).forEach(key=>{  
            this.proxyData(data,key,this);
        }) 
    }

    /**
     * 因为spirit与text中的相关参数 直接写在了x y上，添加了本脚本后需要将this.transform中的数据与this中的数据联系起来
     * 使用数据代理 从而将this.transform中的数据代理到this上 
     * @param {object} data 
     * @param {string} key 
     * @param {this} vm 
     */    
    proxyData(data,key,vm) { 
        Object.defineProperty(vm, key, {
            get() { 
                return data[key]
            },
            set(newValue) {
                data[key] = newValue;
            }
        })
    }
}
// new GameObject;