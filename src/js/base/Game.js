//储存数据使用
import {Spirit} from './Spirit';
import {Text} from './Text';
import {Tool} from './Tool';
import Button from './Button';

export let gameInfo={
    allImageObjMap:null,//所有图片游戏物体的字典
    allImageMap:null,//所有图片名字及其加载好的图片
    showImageObjMap:null,//显示在舞台上的图片
    showFontObjMap:null,//显示出来相关的字体
    createFunMap:null,//创建方法的Map 当一个类中需要初始化的时候，可以调取这个方法
    updataFunMap:null,//创建方法的实时更新的Map 当一个类型需要更新 一个方法的时候可以使用这个
    showGroupObjSet:null,//专门存放group的set
    eventFunMap:null,//事件方法
    waringLogo:'m( =∩ω∩= )m:',//提示的标题
    sceneW:0,
    sceneH:0,
    canvas:null,//离屏canvas
    canvasId:null,
    FindCanvas:null,
    content:null,
    indexSpritiID:0,//创造出来的精灵的id
    indexFontID:0,//字体的专属id
    drawCanvas:null,//渲染canvas
    drawContent:null,
    config:null,
};


export class Game{
    //初始化相关的信息
    constructor(config){
        this.TypeName = 'Game';
        gameInfo.config = config;
        // 设置适配 
        //创建字典
        this.creatGameMap(config);

        //创建canvas
        this.createCanvas(config);
        
        //设置canvas的宽与高度  
        this.setCanvasWH(config);
    
    

        //之所以使用这个的原因是会出现取到的canvas的相关参数this.canvas.getBoundingClientRect().width与height的高度不是最后加载好的DOM数据 这样导致出现了canvas的适配出现了问题
        //dom构建完毕之后调取这个  要不然适配会出现问题
        Tool.DOMContentLoaded(()=>{
            //更新一下canvas的宽与高
            this.setCanvasWH(config);
        });
        //处理屏幕的过高的背景问题 禁止玩家上下滑动
        this.preventDefault(); 
    }
    /**
     *创建Game要使用的相关的map
     */
    creatGameMap(){
        gameInfo.allImageObjMap = new Map();
        gameInfo.showImageObjMap = new Map();
        gameInfo.showFontObjMap = new Map();
        gameInfo.allImageMap = new Map();
        gameInfo.showGroupObjSet = new Set();
        gameInfo.eventFunMap = new Map();//事件的方法
        gameInfo.createFunMap = new Map();//创建事件
        gameInfo.updataFunMap = new Map();//更新事件
    }


    /**
     * 创建cnavas的相关参数
     * @param {object} config 
     */
    createCanvas(config){
        gameInfo.canvasId=config.canvasId;
        gameInfo.FindCanvas=`#${config.canvasId}`,
        //创建离屏canvas 
        this.canvas = document.createElement('canvas');
        this.content = this.canvas.getContext('2d');
        //创建渲染canvas
        this.drawCanvas = document.getElementById(gameInfo.canvasId); 
        this.drawContent = this.drawCanvas.getContext('2d');  


        gameInfo.canvas = this.canvas;
        gameInfo.content = this.content;

        gameInfo.drawCanvas = this.drawCanvas;
        gameInfo.drawContent = this.drawContent;
    }
    /**
     * html的适配 当前并未使用
     * @param {object} config 是不是移动端的适配
     */
    setHTML(config){
        let self = this;
        let setCanvas={
            canvasFun(num){ 
                let canvas = document.createElement("canvas");
                canvas.id = config.canvasId;
                window.document.getElementsByTagName("BODY")[0].appendChild(canvas);
                let _canvas = document.getElementById(config.canvasId);
                let _width = `${config.width/num/2}rem`;
                let _height = `${config.height/num/2}rem`; 
                _canvas.width = _width;
                _canvas.height = _height;
                
                self.createCanvas(config);
                
                self.setCanvasWH(config);
                
                console.log('_width:',_width,'_height:',_height,'_canvas:',_canvas,'docEl.style.fontSize:',docEl.style.fontSize); 
            } 
        }  
        let docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth || 375;
            clientWidth > 750 ? clientWidth = 750 : clientWidth = clientWidth;
            if (clientWidth){
                const fz = docEl.style.fontSize = 20 * (clientWidth / 375);
                let num = 20 * (clientWidth / 375);
                docEl.style.fontSize =num + 'px';
                setCanvas.canvasFun(num);
                window.remscale = clientWidth / 375;
                var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000
                if (fz !== realfz) {
                    document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
                }

            }
        };
        if (document.addEventListener){
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        }  
    }

 

    /**
     * game的单例
     * @param {canvasId 创建出来的canvasID \n
     *          type 填写类型 目前只有canvas
     *          create 素材加载完毕后的执行函数仅仅执行一次
     *          updata 真更新函数
     *          actionScope}config  create,updata不是必填，其他都是必须填写
     */
    static getInstance(config){
        if(this.instance === null || this.instance === undefined){
            this.instance = new Game(config);
        }
        return this.instance;
    }

    /**
     * 在创建完毕了相应的资源开始绘制前一步加上这个 更新画布 防止适配出现问题
     */
    setCanvasWH(config = gameInfo.config){ 
        this.canvas.width = this.drawCanvas.getBoundingClientRect().width*2;
        this.canvas.height = this.drawCanvas.getBoundingClientRect().height*2;

        this.drawCanvas.width = this.drawCanvas.getBoundingClientRect().width*2;
        this.drawCanvas.height = this.drawCanvas.getBoundingClientRect().height*2;
      
        gameInfo.sceneW = this.canvas.width;
        gameInfo.sceneH = this.canvas.height;

        // console.log('------------:',this.drawCanvas.getBoundingClientRect(),this.canvas.width)

        // this.canvas.width = config.width;
        // this.canvas.height = config.height;

        // this.drawCanvas.width = config.width;
        // this.drawCanvas.height = config.height;
      
        // gameInfo.sceneW = this.canvas.width;
        // gameInfo.sceneH = this.canvas.height; 
    }
 
    /**
     *阻止手机端的制动
     */
    preventDefault(){  
        gameInfo.drawCanvas.addEventListener('touchmove',event=>{
            event.preventDefault();
        }); 
    }
    /**
     * 加载的是资源 放进去的是Set  这个是加载第一步
     * @param{Set} FileSet
     * @returns {Function} 返回的是加载完成回调函数
     */
    loadRes(FileSet,BACKfUN=null,updataBACKFun=null){
        let resMapL = 0;//数组中的长度
        for (let x of FileSet) {//遍历set
            // eslint-disable-next-line no-loop-func
            this.loadIamge(x[0],x[1],()=>{
                resMapL++;
                if(resMapL>=FileSet.size){
                    if(BACKfUN!=null && typeof BACKfUN === 'function'){ 
                        BACKfUN();
                    }
                    if(updataBACKFun!=null && typeof updataBACKFun === 'function'){
                        updataBACKFun();
                    }
                    this.create();//调取资源加载完毕的方法
                }
            });
        }
    }
    /**
     * 预加载图片 创建精灵的第一步 并不会进行渲染
     * @param{string} ObjName  参数ObjName(全局唯一) 全局使用这个进行遍历
     * @param{需要加载的图片的路径} imageUrl 图片的地址
     */
    loadIamge(ObjName,imageUrl,BACKfUN){
        if(gameInfo.allImageMap.has(ObjName) === false){
            this.loadImageAsync(imageUrl).then(Iamge_=>{
                gameInfo.allImageMap.set(ObjName,Iamge_);
                BACKfUN();
            },reject=>{this.waring('图片异步加载出错:',reject);});
        }else {
            this.waring(gameInfo.waringLogo,':已经存在此key值',ObjName,'请重新更换');
        }
    }

    /**
     * 异步加载图片的方法 传入url返回image  loadImageAsync.then(v).then(err)
     * @param{需要加载的图片的路径} url
     * @returns {Promise<any>}
     */
    loadImageAsync(url) {
        return new Promise(function(resolve, reject) {
            const image = new Image();
            image.onload = function() {
                resolve(image);
            };
            image.onerror = function() {
                reject(new Error('Could not load image at ' + url));
            };
            image.src = url;
        });
    }

    /**
     * 将取到图片的key 将其显示在屏幕上
     * @param positionX //图片的位置X坐标
     * @param positionY //图片的位置Y坐标
     * @param spriteKey //取到的精灵的key
     * @returns {Spirit} 返回的是精灵
     */
    createSprite(positionX,positionY,spriteKey){ 
        if(gameInfo.allImageMap.has(spriteKey) === true){//检测加载好的资源里面是不是存在这个精灵
            gameInfo.indexSpritiID++;//为了防止出现重复的key
            let Iamge_ = gameInfo.allImageMap.get(spriteKey);//取到图片
            let sprit_ = new Spirit(this.content,Iamge_,spriteKey+'_'+gameInfo.indexSpritiID);//创建精灵
            sprit_.setPosition(positionX,positionY);
            gameInfo.showImageObjMap.set(spriteKey+gameInfo.indexSpritiID,sprit_);
            return sprit_;
        } 
    }

    /**
     * 静态使用的创建方法
     * @param positionX
     * @param positionY
     * @param spriteKey
     * @returns {sprit} 返回一张创建好的图片的素材
     */
    static createSpriteS(positionX,positionY,spriteKey){
        if(gameInfo.allImageMap.has(spriteKey) === true){
            gameInfo.indexSpritiID++;//为了防止出现重复的key
            let Iamge_ = gameInfo.allImageMap.get(spriteKey);
            let sprit_ = new Spirit(gameInfo.content,Iamge_,spriteKey+'_'+gameInfo.indexSpritiID);//创建精灵
            sprit_.setPosition(positionX,positionY);
            gameInfo.showImageObjMap.set(spriteKey+gameInfo.indexSpritiID,sprit_);
            return sprit_;
        } 
    }

    /**
     * 遍历图片显示出来  然后调取帧动画进行渲染
     */
    drawRes(){  
        // canvas.width = canvas.width; // 一种画布专用的技巧
        gameInfo.canvas.width = gameInfo.sceneW;
        gameInfo.drawCanvas.width = gameInfo.sceneW;
        // this.content.clearRect(0,0,gameInfo.sceneW,gameInfo.sceneH);//清除离屏幕canvas
        // this.drawContent.clearRect(0,0,gameInfo.sceneW,gameInfo.sceneH);//清楚画布的canvas 
        // this.content.save(); 
        for (let item  of gameInfo.showImageObjMap.entries()) {//渲染所有的图片 
            item[1].drawResObj();
        }
        // this.content.restore();
        // this.content.save(); 
        for (let item  of gameInfo.showFontObjMap.entries()) {//渲染所有的字体
            item[1].drawResObj();
        }
        // this.content.restore();
        for (let item of gameInfo.eventFunMap.entries()) {//自定义的需要帧更新的方法
            item[1]();
        } 
        for(let item of gameInfo.updataFunMap.entries()){//执行更新的方法
            item[0](item[1])();
        }
        // this.content.restore();
        this.drawContent.drawImage(this.canvas, 0, 0); 
    }
    /**
     * 资源加载完毕之后会会调取这个方法
     */
    create(){  
        let className,funName;//objact的名字与方法的名字
        //将create方法 放到 addCreate 方法中
        if(gameInfo.config.actionScope.create){ 
            Game.addCreateFun(gameInfo.config.actionScope,'create')
        }   
        //遍历执行
        for (const item of gameInfo.createFunMap.entries()) {//自定义的需要帧更新的方法
            className = item[0];
            funName = item[1];
            if(className && funName && className[funName]) className[funName]()
            
        } 
        //订阅按钮事件 仅仅订阅一次
        Button.initBtnEvent();
        //重新设置界面 这个可千万千万不能少 否则会页面显示不适配的问题
        this.setCanvasWH();
        this.updata(); 
    } 
    /**
     * 创建updata的振更新
     */
    updata(){  
        if(gameInfo.config.actionScope.updata){ 
            gameInfo.config.actionScope.updata();
        }  
        //开始绘制 
        this.drawRes();
        //重复调取
        window.requestAnimationFrame(this.updata.bind(this));
    }

    //---------------字体的相关设置-------------------
    /**
     * 创建一个字体
     * @param{number} positionX
     * @param{number} positionY
     * @param{string} textContect
     * @returns{Text} {Text}
     */
    // eslint-disable-next-line consistent-return
    createFont(positionX,positionY,textContect){
        gameInfo.indexFontID++;
        let textKey = `font_${gameInfo.indexFontID}`
        if(gameInfo.showFontObjMap.has(textKey) === false){
            // let 
            let font_ = new Text(gameInfo.content,textContect,`F${gameInfo.indexFontID}`);//gameInfo.content使用的是这个   而不是this.context
            font_.setPosition(positionX,positionY);
            gameInfo.showFontObjMap.set(textKey,font_);
            return font_;
        }
        this.waring(null,`使用createFont方法添加字体，已经存在了这个fontKsy: ${textKey}   请更换!`);
        
    }

    /**
     * 创建静态方法
     * @param positionX
     * @param positionY
     * @param textContect
     * @returns {Text}
     */
    static createFontS(positionX,positionY,textContect){
        gameInfo.indexFontID++;
        let textKey = `font_${gameInfo.indexFontID}`
        if(gameInfo.showFontObjMap.has(textKey) === false){ 
            let font_ = new Text(gameInfo.content,textContect,`F${gameInfo.indexFontID}`);//gameInfo.content使用的是这个   而不是this.context
            font_.setPosition(positionX,positionY);
            gameInfo.showFontObjMap.set(textKey,font_);
            return font_;
        }
        this.waring(null,`使用createFont方法添加字体，已经存在了这个fontKsy: ${textKey}   请更换!`);

    } 
    /**
     * 放入创建的方法  是一个objact 会自动调取objact中的create方法 如果没有则会跳过不执行
     * @param {object} actionScope 传入objact
     * @param {string} funName  要执行的方法
     */
    static addCreateFun(actionScope,funName){
        //不存在这个方法
        if(!gameInfo.createFunMap.has(actionScope)){
            gameInfo.createFunMap.set(actionScope,funName);
        }else{
            console.warn(`addCreat中已经添加过了${funName}方法了,你可以将方法放在${gameInfo.createFunMap.get(actionScope)}中执行`)
        }
    }
    /**
     * 删除添加的帧更新的方法
     * @param {object} actionScope  
     */
    static deleteCreateFun(actionScope){
        gameInfo.createFunMap.delete(actionScope); 
    } 
    /**
     * 添加执行obj
     * @param {objact} actionScope  传入objact
     * @param {string} funName  要执行的方法
     */
    addUpdataFun(actionScope,funName){ 
        if(!gameInfo.updataFunMap.has(actionScope)){
            gameInfo.updataFunMap.set(actionScope,funName);
        }else{
            console.warn(`addCreat中已经添加过了${funName}方法了,你可以将方法放在${gameInfo.updataFunMap.get(actionScope)}中执行`)
        }
    } 
    /**
     * 删除添加的帧更新的方法
     * @param {object} actionScope  
     */
    static deleteUpdataFun(actionScope){
        gameInfo.updataFunMap.delete(actionScope); 
    }  

   /**
   * 添加帧更新
   * @param {string} nameFun  更新函数的唯一标识
   * @param {function} fun 添加帧更新函数
   */
    static addUpdataEventFun(nameFun,fun){
        gameInfo.eventFunMap.set(nameFun,fun);
    }
    /**
     * 删除添加的帧更新的方法
     * @param {string} nameFun 
     */
    static deleteUpdataEventFun(nameFun){
        gameInfo.eventFunMap.delete(nameFun); 
    }

    /**
     * 删除游戏体  包括精灵与字体
     * @param{name} name_
     */
    static deleteObj(name_){
        if(gameInfo.showImageObjMap.has(name_)){
            let obj = gameInfo.showImageObjMap.get(name_);
            gameInfo.showImageObjMap.delete(name_);
            obj = null;
        }else {
            if(gameInfo.showFontObjMap.has(name_)){
                let obj = gameInfo.showImageObjMap.get(name_);
                gameInfo.showImageObjMap.delete(name_);
                obj = null;
            }
        }

    }


    /**
     * 警告的显示
     * @param text
     * @param content
     */
    waring(text,content){
        throw new Error(gameInfo.waringLogo,text,content);

    }
    /**
     * 警告的显示
     * @param text
     * @param content
     */
    static waringS(text,content){
        throw new Error(gameInfo.waringLogo,text,content); 
    }

    /**
     * 显示设备的相关参数
     * @param {number} x 坐标的位置
     * @param {number} y 坐标的位置
     */
    showCanvasWH(x,y){
        this.showCanvasWH = this.createFont(x,y,'showCanvasWH');//创建一个字体
        this.showCanvasWH.fontContent('W:'+this.drawCanvas.getBoundingClientRect().width * 2+'  H:'+this.drawCanvas.getBoundingClientRect().height * 2+' drp:'+window.devicePixelRatio);//设置内容
        this.showCanvasWH.fontColor('#000000');////设置字体的颜色
        this.showCanvasWH.fontSize(26);//设置字体的大小
    }



 


}
