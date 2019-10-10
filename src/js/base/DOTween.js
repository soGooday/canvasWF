/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html' to get effect
*/
export let TweenFun = {
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
//类型
let minType = {
    easeIn:'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
};
export let maxType={
    Linear:'Linear',
    Quad:'Quad.easeOut',
    Cubic: 'Cubic',
    Quart: 'Quart',
    Quint:'Quint',
    Sine:'Sine',
    Expo:'Expo',
    Circ:'Circ',
    Elastic:'Elastic',
    Back:'Back',
    Bounce:'Bounce',
}
//需要引用的类型
export let DoTweenType={
    Linear:{
        easeIn:'Linear.easeIn',
        easeOut: 'Linear.easeOut',
        easeInOut: 'Linear.easeInOut',
    },
    Quad:{
        easeIn:'Quad.easeIn',
        easeOut: 'Quad.easeOut',
        easeInOut: 'Quad.easeInOut',
    },
    Cubic:{
        easeIn:'Cubic.easeIn',
        easeOut: 'Cubic.easeOut',
        easeInOut: 'Cubic.easeInOut',
    },
    Quart: {
        easeIn:'Quart.easeIn',
        easeOut: 'Quart.easeOut',
        easeInOut: 'Quart.easeInOut',
    },
    Quint:{
        easeIn:'Quint.easeIn',
        easeOut: 'Quint.easeOut',
        easeInOut: 'Quint.easeInOut',
    },
    Sine:{
        easeIn:'Sine.easeIn',
        easeOut: 'Sine.easeOut',
        easeInOut: 'Sine.easeInOut',
    },
    Expo:{
        easeIn:'Expo.easeIn',
        easeOut: 'Expo.easeOut',
        easeInOut: 'Expo.easeInOut',
    },
    Circ:{
        easeIn:'Circ.easeIn',
        easeOut: 'Circ.easeOut',
        easeInOut: 'Circ.easeInOut',
    },
    Elastic:{
        easeIn:'Elastic.easeIn',
        easeOut: 'Elastic.easeOut',
        easeInOut: 'Elastic.easeInOut',
    },
    Back:{
        easeIn:'Back.easeIn',
        easeOut: 'Back.easeOut',
        easeInOut: 'Back.easeInOut',
    },
    Bounce:{
        easeIn:'Bounce.easeIn',
        easeOut: 'Bounce.easeOut',
        easeInOut: 'Bounce.easeInOut',
    },
};
export class DOTWeen {


    // function getInstance(){
    //     if( !DOTWeen.instance ){
    //         DOTWeen.instance = new DOTWeen();
    //     }
    //     return DOTWeen.instance;
    // }
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