let  OS = {
    android: false,
    chromeOS: false,
    cocoonJS: false,
    cocoonJSApp: false,
    cordova: false,
    crosswalk: false,
    desktop: false,
    ejecta: false,
    electron: false,
    iOS: false,
    iOSVersion: 0,
    iPad: false,
    iPhone: false,
    kindle: false,
    linux: false,
    macOS: false,
    node: false,
    nodeWebkit: false,
    pixelRatio: 1,
    webApp: false,
    windows: false,
    windowsPhone: false

};
export class Tool {


    //获取指定区间范围随机数，包括lowerValue<=x<=upperValue
    /**
     * 传入取到相关参数
     * @param Min
     * @param Max
     * @returns {*}
     */
    static randomFrom(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range);  //舍去
        return num;

    }
    /**
     * 只支持两位的小数
     * @param Min
     * @param Max
     * @returns {*}
     */
    static randomFromfloat(Min, Max) {
        let backNum = 0;
        let minNum = parseInt(Min);
        let maxNum = parseInt(Max);
        let minFloat =Min - parseInt(Min);
        let maxFloat =Min - parseInt(Max);
        //出现的随机数
        backNum+=this.randomFrom(minFloat,maxNum);
        backNum+=this.randomFrom(minNum*10,maxNum*10)/10;

        backNum = (Math.random()*(Min-Max) + Max).toFixed(2);



    }


    //得到数组的差集
    /**
     * 返回的是arry 差集
     * @param {arry} arr_  大的集合
     * @param {arry} arr   小的集合
     */

    static getDifferenceSet(arr_ ,arr){
        let result = new Array();
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i]] = 1;
        }
        for (let j = 0; j < arr_.length; j++) {
            if (!obj[arr_[j]])
            {
                obj[arr_[j]] = 1;
                result.push(arr_[j]);
            }
        }
        return result;
    }

    /*传入Event对象*/
    /**
     * 传入canvas 与 鼠标点击的Event  从而得到玩家点击的canvas的坐标
     * @param{canvas} element
     * @param{event} event
     * @returns {{x: number, y: number}}
     */
    static getPoint(element, event) {
        event = event || window.event;
        /*将当前的鼠标坐标值减去元素的偏移位置，返回鼠标相对于element的坐标值*/
        var x = (event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return {
            x: x,
            y: y
        };
    };

    /**
     * 传入0-1数值 小数
     * @param{float} poXRatio
     * @param{float} poYRatio
     * @returns{number} {{poXRatio: *, poYRatio: *}}
     */
    static getRatioNum(poXRatio_,poYRatio_){
        let poXRatio = gameInfo.canvasWeight*poXRatio_;
        let poYRatio = gameInfo.canvasHeight*poYRatio_;
        return {poXRatio , poYRatio};
    }

    /**
     * 点与物体的碰撞检测  （结合getPoint方法可以使用点击事件）
     * @param{body{x,y}} body  类型是numder
     * @param{number} x
     * @param{number} y
     * @returns {boolean} 表示两个矩形相交了；否则，返回false
     */
    static pointCollision(body, x, y){
        return !(x < body.x || x > (body.x + body.width)
            || y < body.y || y > (body.y + body.height));
    }


    /**
     * 传入球返回矩形  body.x body.y body.radius  需要使用到这三个属性  可以配合rectangleCollision做碰撞检测
     * @param{body{x,y,radius}} body
     * @returns{obj} {{x: number, y: number, width: number, height: number}}
     */
    static getRoundToRectangleBound(body){
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
    static rectangleCollision(bodyA,bodyB){
        return !(bodyA.x + bodyA.width < bodyB.x ||

            bodyB.x + bodyB.width < bodyA.x ||

            bodyA.y + bodyA.height < bodyB.y ||

            bodyB.y + bodyB.height < bodyA.y);
    }




    /**
     * 传入一个方法 为了让canvas能够及时的取到DOM加完完毕的哪一个取到只够需要改canvas的宽与高
     * @param callback
     * @constructor
     */
    static DOMContentLoaded(callback)
    {
        //使用前需要调取这个方法初花相关的数据
        this.DOMContentLoadedInit();

        if (document.readyState === 'complete' || document.readyState === 'interactive')
        {
            callback();

            return;
        }

    
        let check = function ()
        {
            document.removeEventListener('deviceready', check, true);
            document.removeEventListener('DOMContentLoaded', check, true);
            window.removeEventListener('load', check, true);

            callback();
        };

        if (!document.body)
        {
            window.setTimeout(check, 20);
        }
        else if (OS.cordova && !OS.cocoonJS)
        {
            //  Ref. http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#deviceready
            document.addEventListener('deviceready', check, false);
        }
        else
        {
            document.addEventListener('DOMContentLoaded', check, true);
            window.addEventListener('load', check, true);
        }
    }
    //初始化相关的参数
    static DOMContentLoadedInit ()
    {

        var ua = navigator.userAgent;

        if (/Windows/.test(ua))
        {
            OS.windows = true;
        }
        else if (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)))
        {
            OS.macOS = true;
        }
        else if (/Android/.test(ua))
        {
            OS.android = true;
        }
        else if (/Linux/.test(ua))
        {
            OS.linux = true;
        }
        else if (/iP[ao]d|iPhone/i.test(ua))
        {
            OS.iOS = true;

            (navigator.appVersion).match(/OS (\d+)/);

            OS.iOSVersion = parseInt(RegExp.$1, 10);

            OS.iPhone = ua.toLowerCase().indexOf('iphone') !== -1;
            OS.iPad = ua.toLowerCase().indexOf('ipad') !== -1;
        }
        else if (/Kindle/.test(ua) || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua))
        {
            OS.kindle = true;

            // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
            // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
        }
        else if (/CrOS/.test(ua))
        {
            OS.chromeOS = true;
        }

        if (/Windows Phone/i.test(ua) || (/IEMobile/i).test(ua))
        {
            OS.android = false;
            OS.iOS = false;
            OS.macOS = false;
            OS.windows = true;
            OS.windowsPhone = true;
        }

        var silk = (/Silk/).test(ua);

        if (OS.windows || OS.macOS || (OS.linux && !silk) || OS.chromeOS)
        {
            OS.desktop = true;
        }

        //  Windows Phone / Table reset
        if (OS.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
        {
            OS.desktop = false;
        }

        //  WebApp mode in iOS
        if (navigator.standalone)
        {
            OS.webApp = true;
        }

        if (window.cordova !== undefined)
        {
            OS.cordova = true;
        }

        if (typeof process !== 'undefined' && process.versions && process.versions.node)
        {
            OS.node = true;
        }

        if (OS.node && typeof process.versions === 'object')
        {
            OS.nodeWebkit = !!process.versions['node-webkit'];

            OS.electron = !!process.versions.electron;
        }

        if (navigator.isCocoonJS)
        {
            OS.cocoonJS = true;

            try
            {
                OS.cocoonJSApp = (typeof CocoonJS !== 'undefined');
            }
            catch (error)
            {
                OS.cocoonJSApp = false;
            }
        }

        if (window.ejecta !== undefined)
        {
            OS.ejecta = true;
        }

        if ((/Crosswalk/).test(ua))
        {
            OS.crosswalk = true;
        }

        OS.pixelRatio = window['devicePixelRatio'] || 1;

        return OS;
    }

    /**
     * 赛贝尔函数使用用户
     * @param{any}anchorpoints 传入的{起始点的x,y}，{起始点的参数x,y},{末位点的参数x,y},{末位点的采纳数x,y}
     * @param{number}pointsAmount 速度参数
     * @returns {e,f} 返回的 {x，y}的参数在坐标的体系中
     */
    static bser(anchorpoints, pointsAmount) {
        let points = [];
        for (let i = 0; i < pointsAmount; i++) {
            let point = MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
        function MultiPointBezier(points_, t) {//t贞数
            let len = points_.length;
            let x = 0, y = 0;
            let erxiangshi = function (start, end) {
                let cs = 1, bcs = 1;
                while (end > 0) {
                    cs *= start;
                    bcs *= end;
                    start--;
                    end--;
                }
                return (cs / bcs);
            };
            for (let i = 0; i < len; i++) {
                let point = points_[i];
                x +=/*Math.round()*/ point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));//x弧度
                y +=/*Math.round()*/ point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));//y弧度
            }
            return { e: x, f: y };
        }
    }
}