import {Game} from './Game'




/**
 * 当前的动画类型
 */
export let loopType = {
    fromTo:0,//从开始到目标位置
    toFrom:1,//从目标的位置到初始位置
    pingqang:2,//开始到结尾，结尾到开始 为一个动画
    reversePingqang:3,//结尾到开始  开始到结尾 为一个动画
}
/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html' to get effect
*/ 
export let Ease = {
    Linear(t, b, c, d) { 
        return c * t / d + b; 
    },
    Quad: {
        easeIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == 'undefined') p = d * 0.3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == 'undefined') p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == 'undefined') p = d * (0.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c; 
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -0.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
        }
    },
    Back: {
        easeIn(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158; 
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            } 
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            
        },
        easeInOut(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
            } 
            return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            
        }
    }
}; 
/**
 * 当前组件的信息
 */
let componentInfo={
    constructor:null,//当初实力本组件的原型 
    self:null,//当前的作用域
    id:0,//记录当前运动的id的 使用的是这个 下面的未使用
    moveKey:'moveKey',//当前的动画位移的Key
    scaleKey:'scaleKey',//当前放大缩小的Key
}
export default class DOTween {

    constructor(scope){ 
        this.TypeNamew = 'DOTweenJS';
        componentInfo.constructor = scope;//渠道之前的引用的而动画的相关信息
        componentInfo.self = this;//取到当前的作用域
        componentInfo.id ++; 
    }
    /**
     * 得当仅仅属于当前动画的以恶个id 因为一个活动可能动画会触发很多活动
     * @param {string} CONTEXT 
     */
    getAnimationID(CONTEXT){
        componentInfo.id ++;
        return `${CONTEXT}_${componentInfo.id}`;
    }

    /**
     * 动画的帧动画，我们需要把他提出出来放后面的所有关于位移的动画使用
     * @param {delayedNum:延时函数的参数
     *         object:需要移动的游戏物体，一定要存在XY轴
     *         xORy:是轴还是y轴x轴
     *         easeFun:换帧动画的方法
     *         startNum:开始是的默认是0
     *         fromX:出发的地点
     *         toX:前往的地点 
     *         useTimeNum:总共使用的时间
     *         loopsNum:循环的次数
     *         loopsMode:循环模式
     *         everyFrameFun:每帧动画的回调
     *         onCompleteFun:当前动画完成的回调
     *         singleCompletion:单次完成动画的回调
     *         isCallback 是不是启动当前的函数所有回调 默认是开启的
     *         }//当前需要的动画传入的相关参数
     */
    updataMoveAmin({delayedNum,object,xORy,easeFun,startNum,from,to,useTimeNum,loopsNum,loopsMode,everyFrameFun,onCompleteFun,singleCompletion,isCallback=true}){
        let _animationID = this.getAnimationID(componentInfo.moveKey);//得到仅仅属于当前动画的key
        let _loopsNum = 0;//当前的循环次数 
        //更换开始与结束的坐标专门使用方法
        let FROMTO={
            _to:to,
            _from:from,
            fromToFun(){//不更换坐标的位置
                from = this._from;
                to = this._to;
            },
            toFromFun(){//更换坐标的位置
                from =this. _to;
                to = this._from;
            },
            /**
             * 往返来回的方法
             * @param {number} _num 当前单次动画第几次了
             */
            loopsTypeFun(_num,_loopsMode){
                if(_loopsMode === loopType.pingqang){//开始到结尾，结尾到开始 为一个动画
                    if( _num % 2 === 1){//奇数 更换开始接与目标的位置
                        FROMTO.toFromFun();
                    }else{//偶数 使用正常开始与目标的数值
                        FROMTO.fromToFun();
                    }  
                }else if(_loopsMode === loopType.reversePingqang){//与Pingqang的动画相反
                    if( _num % 2 === 1){//奇数 更换开始接与目标的位置
                        FROMTO.fromToFun();
                    }else{//偶数 使用正常开始与目标的数值 
                        FROMTO.toFromFun();
                    }  
                }
            },
            //判断当前的类型 是不是反方向开始的
            loopsTypeInit(_loopsMode){
                if(_loopsMode === loopType.toFrom ||_loopsMode ===  loopType.reversePingqang){//从目标的位置到初始位置的运动
                    FROMTO.toFromFun();
                }
            }
        }
        //判断当前的动画是不是反向的
        FROMTO.loopsTypeInit(loopsMode) 
        //开始延时函数
        setTimeout(()=>{
            //开始动画逻辑
            Game.addUpdataFun(_animationID,()=>{  
                // 当前的运动位置
                let value = easeFun(startNum, from, to - from, useTimeNum); 
                // 时间递增
                startNum++; 
                // 如果还没有运动到位，继续
                if (startNum < useTimeNum){
                    //帧回调
                    if(isCallback === true  &&  everyFrameFun!=null){
                        everyFrameFun(startNum);
                    }
                    object[xORy] = value;
                } else {  
                     //循环次数增加
                     _loopsNum ++;
                    //判断动画的循环的类型 从而进行相循环处理
                    FROMTO.loopsTypeFun(_loopsNum,loopsMode);  
                    if(loopsNum>0){//判断是不是有指定的次数 
                        // 检查是不是到达了指定的次数了
                        if(_loopsNum>=loopsNum){//次数到了就将循环剔除
                            Game.deleteUpdataFun(_animationID);  
                        }else{
                            startNum = 0;//从新开始动画
                        }
                    }else{
                        startNum = 0;//是0的话 说明是无限次的循环
                    } 
                    //防止_loopsNum 过大 将其固定在0-10之间 减少内存占用
                    if(_loopsNum>=10){
                        _loopsNum = 0;
                    }
                    //帧动画结束的回调
                    if(isCallback === true  &&   onCompleteFun!=null ){
                        onCompleteFun();
                    } 
                } 
            }) 
        },delayedNum)
    } 
     /**
     * DOTween的相关动画的基础逻辑
     */
    DOTweenBase(){ 
        return { 
            fromNum : null,//出发的位置  必填
            toNum : null,//目标的位置 必填
            xORy:'x',//动画控制的变量 默认是x轴
            easeFun : Ease.Linear,//当前的动画效果 必填
            useTimeNum : 1000,//默认是1000毫秒的时间
            loopsNum : 0,//循环的次数 默认无数次的循环0 
            loopsMode:loopType.fromTo,//默认是正常的模式
            delayedNum : 0,//延迟的当前的时间是多少 单位是毫秒
            startNum : 0,//刚刚开始的时间在旋转中需要使用到
            everyFrameFun : null,//当前的每帧动画的返回函数 
            onCompleteFun : null,//动画完成的回调的方法
            singleCompletion : null,//当前单次动画结束的回调方法
            /**
             * 传入当前的初始化位置在哪里
             * @param {number} param 不传参数默认是当前的X坐标 
             */
            from(param =null){
                if(param === null){
                    param = componentInfo.constructor.x;
                }
                this.fromNum = param; 
                return this;
            },
            /**
             * 当前的前往前往的目标点是什么
             * @param {number} param0 
             */
            to(param){
                this.toNum = param; 
                return this;
            },
            /**
             * 设置位移的方式
             */
            setEase(ease){
                this.easeFun = ease; 
                return this;
            },
            /**
             * 循环的次数 机器动画循环的类型
             * @param {number} num 默认执行一次 
             * @param {number} loopsMode  默认的是loopType.fromTo 从from到to
             */
            setLoops(num,loopsMode){
                 this.loopsNum = num || this.loopsNum;//循环的次数
                this.loopsMode = loopsMode || this.loopsMode;//默认是正常的模式 
                console.log(`连续循环${num}次，循环方式${this.loopsMode}`);
                return this; 
            },
            /**
             * 多长时间完成这个动画 单次需要的时间 ！！！需要注意的是pingqiang中的时间，仅仅只动画完成一半需要的时间
             * @param {number} num 单位:毫秒 
             */
            setUseTime(num){  
                //当前使用的时间是多久，完成这个动画
                this.useTimeNum = Math.ceil(num / 17);
                console.log('玩家设置的总的时间是:',num);
                return this;
            },
            /**
             * 设置延时 单位:毫秒
             * @param {number} num 
             */
            setDelayed(num){
                this.delayedNum = num;//当前的延时时间
                console.log(`延时${num}毫秒执行`);
                return this;
            },
            /**
             * 每帧的动画反馈
             * @param {Function} BACK 
             */
            everyFrame(BACK=null){
                if(BACK!=null){
                    this.everyFrameFun = BACK; 
                }
                return this;
            },
            /**
             *  动画执行完毕之后的回调方法
             * @param {Function} BACK 
             */
            onComplete(BACK = null){
                if(BACK!=null){
                    this.onCompleteFun = BACK;
                }
                return this;
            },
            /**
             * 单次动画完成的回调
             * @param {Function} BACK 
             */
            singleCompletion(BACK = null){
                if(BACK!=null){
                    this.singleCompletion = BACK;
                }
                return this;
            },
            /**
             * 动画执行的方法
             */
            DOAnimation(){  
                //检测相关的参数
                if(this.easeFun === null){
                    Game.waringS('请选择动画的函数类型,引用DOTween脚本中的Ease选举出仅需要的相关方法');
                    return
                } 
                // 设置当前的位移相关参数
                let moveInfo={
                    delayedNum:this.delayedNum,
                    object:componentInfo.constructor,
                    xORy:this.xORy,//对x轴进行处理
                    easeFun:this.easeFun,
                    startNum:this.startNum,
                    from:this.fromNum,
                    to:this.toNum,
                    useTimeNum:this.useTimeNum,
                    loopsNum:this.loopsNum,
                    loopsMode:this.loopsMode,
                    everyFrameFun:this.everyFrameFun,
                    onCompleteFun:this.onCompleteFun,
                    singleCompletion:this.singleCompletion,
                }
                //使用位移的方法
                componentInfo.self.updataMoveAmin(moveInfo); 
            }, 
            /**
             * 动画执行的方法
             */
            DO(){
                this.DOAnimation();
            } 
        } 
    }
       /**
     * x轴的运动动画
     */
    DOMoveX(){ 
        let animation = this.DOTweenBase();
        animation.xORy = 'x';//设置的表变量
        // //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {number} param 不传参数默认是当前的X坐标 
         */
        animation.from = function (param = componentInfo.constructor.x) {
            this.fromNum = param; 
            return this;
        }  
        return animation; 
    }
    /**
     * x轴的运动动画
     */
    DOMoveY(){ 
        let animation = this.DOTweenBase();
        animation.xORy = 'y';//设置的表变量
        // //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {number} param 不传参数默认是当前的X坐标 
         */
        animation.from = function (param = componentInfo.constructor.y) {
            this.fromNum = param; 
            return this;
        }  
        return animation; 
    }
    /**
     * xy轴的运双向动画
     */
    DOMove(){  
        let animation = this.DOTweenBase(); 
        //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {x,y} param 不传参数默认是当前的X坐标 
         */
        animation.from = function(param={x:componentInfo.constructor.x,y:componentInfo.constructor.y}){ 
            this.fromInfo = param; 
            return this;
        };
        /**
         * 当前的前往前往的目标点是什么 默认是出发位置
         * @param {x,y} param
         */
        animation.to = function(param={x:componentInfo.constructor.x,y:componentInfo.constructor.y}){ 
            this.toInfo = param;  
            return this;
        }; 
        /**
         * 执行动画
         */
        animation.DOAnimation = function(){  
            //检测相关的参数
            if(this.easeFun === null){
                Game.waringS('请选择动画的函数类型,引用DOTween脚本中的Ease选举出仅需要的相关方法');
                return
            } 
            // 设置当前的x位移相关参数
            let moveInfo={
                delayedNum:this.delayedNum,
                object:componentInfo.constructor,
                xORy:'x',//对x轴进行处理
                easeFun:this.easeFun,
                startNum:this.startNum,
                from:this.fromInfo.x,
                to:this.toInfo.x,
                useTimeNum:this.useTimeNum,
                loopsNum:this.loopsNum,
                loopsMode:this.loopsMode,
                everyFrameFun:this.everyFrameFun,
                onCompleteFun:this.onCompleteFun,
                singleCompletion:this.singleCompletion,
            }
            //使用位移的方法
            componentInfo.self.updataMoveAmin(moveInfo); 

            // 设置当前的y位移相关参数
            let moveInfo2={
                delayedNum:this.delayedNum,
                object:componentInfo.constructor,
                xORy:'y',//对y轴进行处理
                easeFun:this.easeFun,
                startNum:this.startNum,
                from:this.fromInfo.y,
                to:this.toInfo.y,
                useTimeNum:this.useTimeNum,
                loopsNum:this.loopsNum,
                loopsMode:this.loopsMode,
                everyFrameFun:this.everyFrameFun,
                onCompleteFun:this.onCompleteFun,
                singleCompletion:this.singleCompletion,
                isCallback:false,//取消这函数所有的回调
            }
            //使用位移的方法
            componentInfo.self.updataMoveAmin(moveInfo2); 
        }; 
        return animation;  
    }
    /**
     * 设置大小而专门使用的 关于宽的设置
     */
    DOScaleWidth(){ 
        let animation = this.DOTweenBase();
        animation.xORy = 'scaleW',//设置的表变量
        //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {number} param 不传参数默认是当前的X坐标 
         */
        animation.from = function (param = componentInfo.constructor.scaleW){
            this.fromNum = param; 
            return this;
        }  
        return animation; 
    }
    /**
     * 设置大小而专门使用的 关于高的设置
     */
    DOScaleHeight(){ 
        let animation = this.DOTweenBase();
        animation.xORy = 'scaleH',//设置的表变量
        //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {number} param 不传参数默认是当前的X坐标 
         */
        animation.from = function (param =  componentInfo.constructor.scaleH) {
            this.fromNum = param; 
            return this;
        }  
        return animation; 
    }
       /**
     * 设置大小而专门使用的 关于高的设置
     */
    DOScale(){ 
        let animation = this.DOTweenBase(); 
        //将方法from的默认方法进行重写
        /**
         * 传入当前的初始化位置在哪里
         * @param {x,y} param 不传参数默认是当前的X坐标 
         */
        animation.from = function(param={x:1,y:1}){ 
            this.fromInfo = param; 
            return this;
        };
        /**
         * 当前的前往前往的目标点是什么 默认是出发位置
         * @param {x,y} param
         */
        animation.to = function(param={x:1,y:1}){ 
            this.toInfo = param;  
            return this;
        }; 
        /**
         * 执行动画
         */
        animation.DOAnimation = function(){  
            //检测相关的参数
            if(this.easeFun === null){
                Game.waringS('请选择动画的函数类型,引用DOTween脚本中的Ease选举出仅需要的相关方法');
                return
            } 
            // 设置当前的x位移相关参数
            let moveInfo={
                delayedNum:this.delayedNum,
                object:componentInfo.constructor,
                xORy:'scaleW',//对x轴进行处理
                easeFun:this.easeFun,
                startNum:this.startNum,
                from:this.fromInfo.x,
                to:this.toInfo.x,
                useTimeNum:this.useTimeNum,
                loopsNum:this.loopsNum,
                loopsMode:this.loopsMode,
                everyFrameFun:this.everyFrameFun,
                onCompleteFun:this.onCompleteFun,
                singleCompletion:this.singleCompletion,
            }
            //使用位移的方法
            componentInfo.self.updataMoveAmin(moveInfo); 

            // 设置当前的y位移相关参数
            let moveInfo2={
                delayedNum:this.delayedNum,
                object:componentInfo.constructor,
                xORy:'scaleH',//对y轴进行处理
                easeFun:this.easeFun,
                startNum:this.startNum,
                from:this.fromInfo.y,
                to:this.toInfo.y,
                useTimeNum:this.useTimeNum,
                loopsNum:this.loopsNum,
                loopsMode:this.loopsMode,
                everyFrameFun:this.everyFrameFun,
                onCompleteFun:this.onCompleteFun,
                singleCompletion:this.singleCompletion,
                isCallback:false,//取消这函数所有的回调
            }
            //使用位移的方法
            componentInfo.self.updataMoveAmin(moveInfo2); 
        }; 
        return animation;
    }
    /**
     * 设置位移的方式
     */
    setEase(ease){

    }
    /**
     * 循环的次数
     * @param {*} num 
     */
    setLoops(num){


    }
    /**
     * 设置延时 单位是毫秒
     * @param {number} num 
     */
    setDelayed(num){

    }
    /**
     *  动画执行完毕之后的回调方法
     * @param {Function} BACK 
     */
    onComplete(BACK = null){
        if(BACK!=null){
            BACK();
        }
    }
 
    /**
     * 
     * @param {number} from 出发点
     * @param {number} to  目的地
     * @param {time/ms} duration 时间单位毫秒   600ms 或者 0.6s
     * @param {Tween} easing Tween的类型
     * @param {Function} callback 回调方法
     */
    static doTWeen(from, to, duration, easing, callback) {
        let isUndefined = function (obj) {
            return typeof obj == 'undefined';
        };
        let isFunction = function (obj) {
            return typeof obj == 'function';
        };
        let isNumber = function(obj) {
            return typeof obj == 'number';
        };
        let isString = function(obj) {
            return typeof obj == 'string';
        };

        // 转换成毫秒
        let toMillisecond = function(obj) {
            if (isNumber(obj)) {
                return     obj;
            } else if (isString(obj)) {
                if (/\d+m?s$/.test(obj)) {
                    if (/ms/.test(obj)) {
                        return Number(obj.replace('ms', ''));
                    }
                    return 1000 * obj.replace('s', '');
                } else if (/^\d+$/.test(obj)) {
                    return Number(obj);
                }
            }
            return -1;
        };

        if (!isNumber(from) || !isNumber(to)) {
            if (window.console) {
                console.error('from和to两个参数必须且为数值');
            }
            return 0;
        }

        // 缓动算法
        let tween = TweenFun;
        if (!tween) {
            if (window.console) {
                console.error('缓动算法函数缺失');
            }
            return 0;
        }

        // duration, easing, callback均为可选参数
        // 而且顺序可以任意
        let options = {
            duration: 300,
            easing: 'Linear',
            callback() {},
        };

        let setOptions = function(obj) {
            if (isFunction(obj)) {
                options.callback = obj;
            } else if (toMillisecond(obj) != -1) {
                options.duration = toMillisecond(obj);
            } else if (isString(obj)) {
                options.easing = obj;
            }
        };
        setOptions(duration);
        setOptions(easing);
        setOptions(callback);

        // requestAnimationFrame的兼容处理
        if (!window.requestAnimationFrame) {
            // eslint-disable-next-line no-global-assign
            requestAnimationFrame = function (fn) {
                return setTimeout(fn, 17);
            };
        }
        if (!window.cancelAnimationFrame) {
            // eslint-disable-next-line no-global-assign
            cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }

        // 算法需要的几个变量
        let start = 0;
        // during根据设置的总时间计算
        let during = Math.ceil(options.duration / 17);
        // 动画请求帧
        let req = null;

        // 当前动画算法
        // 确保首字母大写
        options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
        let arrKeyTween = options.easing.split('.');
        let fnGetValue;

        if (arrKeyTween.length == 1) {
            fnGetValue = tween[arrKeyTween[0]];
        } else if (arrKeyTween.length == 2) {
            fnGetValue = tween[arrKeyTween[0]] && tween[arrKeyTween[0]][arrKeyTween[1]];
        }
        if (isFunction(fnGetValue) == false) {
            console.error('没有找到名为"'+ options.easing +'"的动画算法');
            // eslint-disable-next-line consistent-return
            return;
        }

        // 运动
        let step = function() {
            // 当前的运动位置
            let value = fnGetValue(start, from, to - from, during);

            // 时间递增
            start++;
            // 如果还没有运动到位，继续
            if (start <= during) {
                options.callback(value);
                req = window.requestAnimationFrame(step);
            } else {
                // 动画结束，这里可以插入回调...
                options.callback(to, true);
            }
        };
        // 开始执行动画
        step();

        return function () {
            return req;
        };
    };



    
}