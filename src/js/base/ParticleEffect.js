
// ParticleEffect_.create('#canvas',{
//     startPoint: '750,0', //【选填】起点坐标，默认是画布的中心
//     image: '../images/snow.png',//图片的显示
//     direction: '-1, 1' ,//【选填】x，y方向，用正负1来代表方向(默认为(0,0)随机方向)
//     speed: '10' , //【选填】粒子速度（默认为2）
//     size: '25', //【选填】粒子大小(默认为2)
//     count: '5' //【选填】粒子数量级，默认为5（0-10）
// });
// /***
//  # canvas粒子效果组件
//  + 本组件可以实现飘雪、下雨、花瓣、星火等粒子效果
//  + demo地址后面加上参数`?fps=1` 可以在页面左上角显示当前的fps状态;
//  + 组件有加入canvas支持判断，**pc移动**都可以用
//  ## 参数列表
//  名字     | 说明                                           | 备注
//  -----------    |------------------------------------------------|------
//  **参数** |
//  第一个参数     | canvas容器DOM                                     | 必填
//  startPoint    | 粒子起点坐标，默认是画布的中心                      | 选填
//  direction     | 粒子x，y方向，用正负1来代表方向(默认为(0,0)随机方向  | 选填
//  speed         | 粒子速度（默认为2）                                | 选填
//  size          | 粒子大小(默认为2)                                  | 选填
//  count         | 粒子数量级，默认为5（0-10）                         | 选填
//  startColor    | 粒子渐变色的起始值，粒子不是图片时生效（默认值rgba(255,255,255,1)）  | 选填
//  endColor       | 粒子渐变色的结束值,粒子不是图片时生效（默认值rgba(255,255,255,0.3)）         | 选填
//  ************调用粒子************
//  <canvas class="snow-canvas" id="Jcanvas">
//  <img src="img/snow.png" class="hide">
//  </canvas>
//  $('#Jcanvas')[0].width = 1900;
//  $('#Jcanvas')[0].height = 1000;
//  ParticleEffect.create('#Jcanvas',{
//     startPoint: '1900,-100', //【选填】起点坐标，默认是画布的中心
//     image: 'img/snow.png', //【选填】粒子图片，切图时请切正方形（默认为空）
//     direction: '-1, 1' ,//【选填】x，y方向，用正负1来代表方向(默认为(0,0)随机方向)
//     speed: '10' , //【选填】粒子速度（默认为2）
//     size: '25', //【选填】粒子大小(默认为2)
//     count: '5' //【选填】粒子数量级，默认为5（0-10）
// });
//  ***/
//
import {Game} from './Game';
import {Tool} from './Tool';
import {gameInfo} from './Game';

/***
 # canvas粒子效果组件

 + 本组件可以实现飘雪、下雨、花瓣、星火等粒子效果

 + demo地址后面加上参数`?fps=1` 可以在页面左上角显示当前的fps状态;

 + 组件有加入canvas支持判断，**pc移动**都可以用

 ## 参数列表

 名字     | 说明                                           | 备注
 -----------    |------------------------------------------------|------
 **参数** |
 第一个参数     | canvas容器DOM                                     | 必填
 startPoint    | 粒子起点坐标，默认是画布的中心                      | 选填
 direction     | 粒子x，y方向，用正负1来代表方向(默认为(0,0)随机方向  | 选填
 speed         | 粒子速度（默认为2）                                | 选填
 size          | 粒子大小(默认为2)                                  | 选填
 count         | 粒子数量级，默认为5（0-10）                         | 选填
 startColor    | 粒子渐变色的起始值，粒子不是图片时生效（默认值rgba(255,255,255,1)）  | 选填
 endColor       | 粒子渐变色的结束值,粒子不是图片时生效（默认值rgba(255,255,255,0.3)）         | 选填

 ************调用粒子************

 <canvas class="snow-canvas" id="Jcanvas">
 <img src="img/snow.png" class="hide">
 </canvas>


 $('#Jcanvas')[0].width = 1900;
 $('#Jcanvas')[0].height = 1000;
 ParticleEffect.create('#Jcanvas',{
    startPoint: '1900,-100', //【选填】起点坐标，默认是画布的中心
    image: 'img/snow.png', //【选填】粒子图片，切图时请切正方形（默认为空）
    direction: '-1, 1' ,//【选填】x，y方向，用正负1来代表方向(默认为(0,0)随机方向)
    speed: '10' , //【选填】粒子速度（默认为2）
    size: '25', //【选填】粒子大小(默认为2)
    count: '5' //【选填】粒子数量级，默认为5（0-10）
});

 ***/

// export var ParticleEffect_ = function() {
//     var _class = function(options) {
//         var _width,
//             _height,
//             _ctx,
//             _particles = {},
//             _particleNum,
//             _particleIndex = 0,
//             _startColor,
//             _endColor,
//             _size,
//             _speed,
//             _directionX = 0,
//             _directionY = 0,
//             _startPointX,
//             _startPointY,
//             _image,
//             _imageEle;
//
//         this.options = $.extend({
//             count: 5,
//             speed: 2,
//             size: 2,
//             startColor: 'rgba(255,255,255,255)',
//             endColor: 'rgba(255,255,255,255)'
//         }, options);
//         this.canvas = this.options.canvas.get(0);
//         _ctx = this.canvas.getContext("2d");
//         _particleNum = (10 - this.options.count)/10;
//         _size = this.options.size;
//         _speed = this.options.speed;
//         _width = this.canvas.width,
//         _height = this.canvas.height;
//         _startPointX = _width/2;
//         _startPointY = _height/2;
//         _startColor = this.options.startColor;
//         _endColor = this.options.endColor;
//         _imageEle = this.options.canvas.find('img');
//         if(this.options.direction){
//             var directions = this.options.direction.split(',');
//             if(directions[1]){
//                 _directionX = directions[0];
//                 _directionY = directions[1];
//             }
//         }
//         if(this.options.startPoint){
//             var startPoints = this.options.startPoint.split(',');
//             if(startPoints[1]){
//                 _startPointX = startPoints[0]*1;
//                 _startPointY = startPoints[1]*1;
//             }
//         }
//
//         // if (!Date.now)
//         //     Date.now = function() {
//         //         return new Date().getTime();
//         //     };
//         // var vendors = ['webkit', 'moz'];
//         // for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
//         //     var vp = vendors[i];
//         //     window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
//         //     window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
//         // }
//         // if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
//         //     || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
//         //     var lastTime = 0;
//         //     window.requestAnimationFrame = function(callback) {
//         //         var now = Date.now();
//         //         var nextTime = Math.max(lastTime + 16, now);
//         //         return setTimeout(function() {
//         //                 callback(lastTime = nextTime);
//         //             },
//         //             nextTime - now);
//         //     };
//         //     window.cancelAnimationFrame = clearTimeout;
//         // }
//
//         function animate() {
//             var _this = this;
//             window.requestAnimationFrame(animate);
//             _ctx.globalCompositeOperation = "source-over";
//             _ctx.clearRect(0, 0, _width, _height);
//             _ctx.globalCompositeOperation = "lighter";
//             if (Math.random() > _particleNum) {
//                 new Particle();
//             }
//             for (var i in _particles) {
//                 _particles[i].draw();
//             }
//         }
//
//         function Particle() {
//             this.x = _startPointX;
//             this.y = _startPointY;
//
//             this.vx = direction(_directionX) * _speed * Math.random();
//             this.vy = direction(_directionY) * _speed * Math.random();
//             this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01;
//
//             _particleIndex++;
//             _particles[_particleIndex] = this;
//             this.id = _particleIndex;
//             this.size = Math.random() * _size;
//
//         }
//
//         function direction(n){
//             var d,
//                 n = n*1;
//             if((n && n > 0) || (!n && Math.random() - 0.5 > 0)){
//                 d = 1;
//             }else{
//                 d = -1;
//             }
//             return d;
//         }
//         Particle.prototype.draw = function() {
//             this.x += this.vx;
//             this.y += this.vy;
//
//             this.size += this.growth;
//             if (this.x > _width || this.y > _height) {
//                 _particleIndex--;
//                 delete _particles[this.id];
//             }
//
//             if(_imageEle.attr('src')){
//                 _ctx.drawImage(_imageEle.get(0), this.x, this.y, this.size, this.size);
//                 return;
//             }
//
//         };
//         window.requestAnimationFrame(animate);
//     };
//
//     return {
//         create(ele,options) {
//             if(!document.createElement('canvas').getContext){
//                 return;
//             }
//             $(ele).each(function(i, e) {
//                 var scope = $.extend({}, options);
//                 $.each(e.attributes, function(index, key) {
//                     scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
//                 });
//                 scope.canvas = $(e);
//                 return new _class(scope);
//             });
//
//         }
//     }
// }();
//
//


//
//
// export class ParticleEffect {
//     constructor(info){
//         this.TypeNme = 'ParticleEffect';
//
//
//         this.PactIngo={
//             startPosition:{//这个是特效出现的位置
//                 x:0,
//                 y:0,
//             },
//             image:[],//图片是一个数组传进来的是图片的路径 当数量大于1的时候就会出现随机出现
//             direction:{//方向 按照坐标轴的确定 -1 <-> 1 之间 来确定粒子的方向
//                 x:0,
//                 y:0,
//             },
//             speedNum:2,//速度
//             size:1,//这个是倍数 默认是不变化大小
//             count:1,//生成几个粒子  默认是一个
//         };
//
//         this.allObjList = new Set();
//
//
//         this.PactIngo = info;
//
//
//         this._width,//宽
//         this._height,//高
//         this._ctx,//canvas
//         this._particles = {},//存放粒子的列表
//         this._particleNum,//
//         this._particleIndex = 0,//第几个粒子
//         this. _startColor,//开始颜色
//         this._endColor,//结束的时候的颜色
//         this._size,//粒子的大小
//         this._speed,//粒子的速度
//         this._directionX = 0,//粒子的方向
//         this._directionY = 0,
//         this. _startPointX,//粒子出现的位置
//         this. _startPointY,//
//         this._image,//照片
//         this._imageEle;
//
//         //神拷贝数据
//         this.options = $.extend({
//             count: 5,
//             speed: 2,
//             size: 2,
//             startColor: 'rgba(255,255,255,255)',
//             endColor: 'rgba(255,255,255,255)'
//         }, options);
//         // this.canvas = this.options.canvas.get(0);
//         // this._ctx = this.canvas.getContext("2d");
//         this.canvas = gameInfo.canvas;
//         this._ctx = gameInfo.content;
//         this._particleNum = (10 - this.options.count)/10;
//         this._size = this.options.size;
//         this._speed = this.options.speed;
//         this._width = this.canvas.width,
//         this._height = this.canvas.height;
//         this._startPointX =  this._width/2;
//         this._startPointY =  this._height/2;
//         this._startColor = this.options.startColor;
//         this._endColor = this.options.endColor;
//         this._imageEle = this.options.canvas.find('img');
//         if(this.options.direction){
//             var directions = this.options.direction.split(',');
//             if(directions[1]){
//                 this._directionX = directions[0];
//                 this._directionY = directions[1];
//             }
//         }
//         if(this.options.startPoint){
//             var startPoints = this.options.startPoint.split(',');
//             if(startPoints[1]){
//                 this. _startPointX = startPoints[0]*1;
//                 this. _startPointY = startPoints[1]*1;
//             }
//         }
//         this.TypeName = 'ParticleEffect';
//         Game.addUpdataFun( this.TypeName,this.updata.bind(this));
//     }
//
//     /**
//      * 创建相应的粒子
//      */
//     // createParticleEffect(){
//     //     for (let i=0;i<=this.PactIngo.count,i++){
//     //         let rn = Tool.randomFrom(0,this.PactIngo.image.length-1);
//     //         let image = Game.createSpriteS(this.PactIngo.startPosition.x,this.PactIngo.startPosition.y,this.PactIngo.image[rn]);
//     //         this.allObjList.add(image);
//     //     }
//     // }
//
//     create(ele,options) {
//         if(!gameInfo.content){
//             // if(!document.createElement('canvas').getContext){
//             return;
//         }
//         $(ele).each(function(i, e) {
//             var scope = $.extend({}, options);
//             $.each(e.attributes, function(index, key) {
//                 scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
//             });
//             scope.canvas = $(e);
//             return new _class(scope);
//         });
//
//     }
//
//     //开始动画
//     animate() {
//
//         window.requestAnimationFrame(animate);
//         _ctx.globalCompositeOperation = "source-over";
//         _ctx.clearRect(0, 0, _width, _height);
//         _ctx.globalCompositeOperation = "lighter";
//         if (Math.random() > _particleNum) {
//             new Particle();
//         }
//         for (var i in _particles) {
//             _particles[i].draw();
//         }
//     }
//
//     direction(n){
//         var d,
//             n = n*1;
//         if((n && n > 0) || (!n && Math.random() - 0.5 > 0)){
//             d = 1;
//         }else{
//             d = -1;
//         }
//         return d;
//     }
//
//
//     Particle() {
//         this.x = _startPointX;
//         this.y = _startPointY;
//
//         this.vx = direction(_directionX) * _speed * Math.random();
//         this.vy = direction(_directionY) * _speed * Math.random();
//         this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01;
//
//         _particleIndex++;
//         _particles[_particleIndex] = this;
//         this.id = _particleIndex;
//         this.size = Math.random() * _size;
//
//     }
//
//     Particle.prototype.draw = function() {
//         this.x += this.vx;
//         this.y += this.vy;
//
//         this.size += this.growth;
//         if (this.x > _width || this.y > _height) {
//             _particleIndex--;
//             delete _particles[this.id];
//         }
//
//         if(_imageEle.attr('src')){
//             _ctx.drawImage(_imageEle.get(0), this.x, this.y, this.size, this.size);
//             return;
//         }
//
//         var grd = _ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
//         grd.addColorStop(0, _startColor);
//         grd.addColorStop(1, _endColor);
//         _ctx.fillStyle = grd;
//         _ctx.beginPath();
//         _ctx.arc(this.x, this.y, this.size, 0 * Math.PI, 2 * Math.PI);
//         _ctx.fill();
//     };
//     // window.requestAnimationFrame(animate);
//
//
//     //帧更新
//     updata(){
//
//
//
//     }
// };
//
//
/**
 * 粒子
 */
export class ParticleEffect {
    constructor(config){
    // constructor(positionX,positionY,spiritName,xVel,yVel,scale,gravity){
        //创建精灵
        this.transfrom = Game.createSpriteS(config.position.x,config.position.y,config.spiritName);
        this.transfrom.scale(config.scale,config.scale);//设置大小
        this.spritName = this.transfrom.spritName;//取到名字

        this.xVel = config.xVel;//x偏移量
        this.yVel = config.yVel;///y偏移量
        this.scale = config.scale;//大小
        this.gravity = config.gravity;//重力
        this.rotate = config.rotate;//旋转角度
        this.rotate = 1;//旋转角度


        // console.log(config.scale, config.rotate);
        //设置真更新函数
        Game.addUpdataFun(this.spritName,this.updata.bind(this));
        return this;
    }


    updata(){
        if(this.transfrom.y>=gameInfo.canvas.height || this.transfrom.x>=gameInfo.canvas.width){
            Game.deleteUpdataFun(this.spritName);//移除本函数
            this.transfrom.destroy();//销毁游戏体
            this.transfrom.setActive(false);
            return;
        }

        this.yVel += this.gravity;
        this.transfrom.y += this.yVel;
        this.transfrom.x += this.xVel;
        this.transfrom.rotateBy(this.rotate);
    }



}

/**
 * 粒子发射器
 */
export class ParticleLauncher {
    /**
     * 初始化的配置
     * @param config
     */
    constructor(){
        this.TypeName = 'ParticleLauncher';
        this.particleList = new Map() ;//粒子发射器的列表
        return this;
    }

    /**
     * 发射器的相关参数
     * @param{positon:{x,y},imageList:[],count[],speed[],size[],gravity} config
     */
    create(config){

        if(config.imageList === null || config.imageList === undefined){
            new Error('请设置相应的粒子发射器的相应的图片,config.imageList不能为空');
            return ;
        }

        this.config = $.extend({
            canvas:null,//canvas
            content:null,//上下文
            count: [5,5],//数量的区间
            speed: [1,5],//速度的区间
            scale: [0.5,1],//大小的区间
            gravity:0.5,//重力的参数
            position:{
                x:0,//初始化的位置
                y:0,//初始化的位置
            },
            imageList:[],//粒子的图片位置
            rotate:[-2,2],//旋转的范围
            direction:[0,0],//粒子x，y方向，用正负1来代表方向(默认为(0,0)随机方向
        }, config);



        //取到用该得到的数量
        let nameNum = Tool.randomFrom(this.config.count[0],this.config.count[this.config.count.length-1]);
        let spiritNum = 0;//随机出来的第几张图片

        for (let i = 1; i <= nameNum ; i++){
            spiritNum = Tool.randomFrom(0,this.config.imageList.length-1);//随机一个给出来的随机图片 随机第几个
            this.makeData(this.config.position,this.config.imageList[spiritNum],this.config.scale,this.config.gravity,this.config.rotate,this.config);

        }

    }

    /**
     * 传入位置 xy  与图片
     * @param{x,y} position
     * @param{spiriteName} Spirite_
     */
    makeData(position,spiritName,scale_,gravity,rotate_,launcherConfig){

        let xVel=Math.random();
        xVel=xVel>0.5?-xVel*8:xVel*8;//坐标上的偏移量
        let yVel=-Math.random()*15;//坐标上的偏移量
        // let vxvy = this.getVxy(launcherConfig.direction,launcherConfig.speed);
        // let xVel =vxvy.vx;
        // let yVel =vxvy.vy;



        let scale =Tool.randomFromfloat(launcherConfig.scale[0],launcherConfig.scale[1]);
        let rotate = Tool.randomFromfloat(launcherConfig.rotate[0],launcherConfig.rotate[1]);



        //生成的粒子的相爱难相关的配置
        let config = {
            position,
            spiritName,
            scale,
            yVel,
            xVel,
            gravity,
            rotate
        };


        // console.log(config);
        //生成粒子
        let particle = new ParticleEffect(config);//创建粒子


        //加入列表
        this.particleList.set(particle.spritName,particle);//加入数组 便于更新位置与移除处理


    }

    /**
     * 的到随机的数值
     * @param directionX
     * @param directionY
     * @param speed
     * @returns {{vx: *, vy: *}}
     */
    getVxy (direction,speed){

        speed = Tool.randomFrom(speed[0],speed[1]);
        let vx = this.direction(direction[0]) * speed * Math.random();
        let vy = this.direction(direction[1]) * speed * Math.random();

        return {vx,vy};
    }



    // function Particle() {
    //     this.x = _startPointX;
    //     this.y = _startPointY;
    //
    //     this.vx = direction(_directionX) * _speed * Math.random();
    //     this.vy = direction(_directionY) * _speed * Math.random();
    //     this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01;
    //
    // }
    /**
     * 向量 取值范围在[-1,1];
     * @param n
     * @returns {number}
     */
    direction(n){
        var d,
            n = n*1;
        if((n && n > 0) || (!n && Math.random() - 0.5 > 0)){
            d = 1;
        }else{
            d = -1;
        }
        return d;
    }

    //
    // Particle.prototype.draw = function() {
    //     this.x += this.vx;
    //     this.y += this.vy;
    //
    //     this.size += this.growth;
    //
    //     if(_imageEle.attr('src')){
    //         _ctx.drawImage(_imageEle.get(0), this.x, this.y, this.size, this.size);
    //         return;
    //     }
    //
    // };
    
}

