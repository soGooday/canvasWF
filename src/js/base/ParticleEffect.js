
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
 
/**
 * 粒子
 */
export class ParticleEffect {
    constructor(config){
    // constructor(positionX,positionY,spiritName,xVel,yVel,scale,gravity){
        //创建精灵
        this.transfrom = Game.createSpriteS(config.position.x,config.position.y,config.spiritName);
        // console.log("this.transfrom:",config)
        this.transfrom.setScale(config.scale,config.scale);//设置大小
        this.spritName = this.transfrom.objectID;//取到名字

        this.xVel = config.xVel;//x偏移量
        this.yVel = config.yVel;///y偏移量
        this.scale = config.scale;//大小
        this.gravity = config.gravity;//重力
        this.rotate = config.rotate;//旋转角度
        this.rotate = 1;//旋转角度

        // console.log(this.transfrom.scaleW)


        // // console.log(config.scale, config.rotate);
        // //设置真更新函数
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
        this.transfrom.setRotateBy(this.rotate);
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

        this.config = Object.assign({
            canvas:gameInfo.canvas,//canvas
            content:gameInfo.content,//上下文
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
        // let {x,y} =Tool.normalize(vxvy)
        // console.log(vxvy)
        // xVel =xVel * x;
        // yVel =yVel * y;
        // console.log(xVel,yVel)

        // console.log(scale_,rotate_,scale,rotate);
        let scale =Tool.randomFromfloat(scale_[0],scale_[1]);
        let rotate = Tool.randomFromfloat(rotate_[0],rotate_[1]);
        // let direction = Tool.randomFromfloat(launcherConfig.direction[0],launcherConfig.direction[1]);
        let {x,y} = Tool.normalize({x:launcherConfig.direction[0],y:launcherConfig.direction[1]})
        xVel =xVel * x;
        yVel =yVel * y;
        // console.log(scale_,rotate_,scale,rotate);
        // console.log('direction:', {yVel,xVel},{x,y})

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
        return {x:vx,y:vy};
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

