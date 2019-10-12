//储存数据使用
import {Spirit} from './Spirit';
import {Text} from './Text';
import {Tool} from './Tool';

export let gameInfo={
    allImageObjMap:null,//所有图片游戏物体的字典
    allImageMap:null,//所有图片名字及其加载好的图片
    showImageObjMap:null,//显示在舞台上的图片
    showFontObjMap:null,//显示出来相关的字体
    showGroupObjSet:null,//专门存放group的set
    eventFun:null,//事件方法
    waringLogo:'m( =∩ω∩= )m:',//提示的标题
    sceneW:0,
    sceneH:0,
    canvas:null,
    canvasId:'fruitMachinesCanvas',
    FindCanvas:'#fruitMachinesCanvas',
    content:null,
    indexSpritiID:0,//创造出来的精灵的id
};
export class Game{
    //初始化相关的信息
    constructor(){


        this.TypeName = 'Game';
        //创建字典
        gameInfo.allImageObjMap = new Map();
        gameInfo.showImageObjMap = new Map();
        gameInfo.showFontObjMap = new Map();
        gameInfo.allImageMap = new Map();
        gameInfo.showGroupObjSet = new Set();
        gameInfo.eventFunMap = new Map();//事件的方法

        //接收到canvas
        // this.canvas = document.getElementById(gameInfo.canvasId);
        // this.content = this.canvas.getContext('2d');

        this.canvas = document.createElement('canvas');
        this.content = this.canvas.getContext('2d');

        this.drawCanvas = document.getElementById(gameInfo.canvasId);
        this.drawContent = this.drawCanvas.getContext('2d');
        

        //设置canvas的宽与高度
        this.setCanvasWH();
        //储存起来相应数组 备用
        gameInfo.canvas = this.canvas;
        gameInfo.content = this.content;

 

        //之所以使用这个的原因是会出现取到的canvas的相关参数this.canvas.getBoundingClientRect().width与height的高度不是最后加载好的DOM数据 这样导致出现了canvas的适配出现了问题
        //dom构建完毕之后调取这个  要不然适配会出现问题
        Tool.DOMContentLoaded(()=>{
            //更新一下canvas的宽与高
            this.setCanvasWH();
        });
        //处理屏幕的过高的背景问题 禁止玩家上下滑动
        this.preventDefault();





    }

    /**
     * game的单例
     * @returns {Game}
     */
    static getInstance(){
        if(this.instance === null || this.instance === undefined){
            this.instance = new Game();
        }
        return this.instance;
    }

    /**
     * 在创建完毕了相应的资源开始绘制前一步加上这个 更新画布 防止适配出现问题
     */
    setCanvasWH(){
        this.canvas.width = this.drawCanvas.getBoundingClientRect().width*2;
        this.canvas.height = this.drawCanvas.getBoundingClientRect().height*2;

        this.drawCanvas.width = this.drawCanvas.getBoundingClientRect().width*2;
        this.drawCanvas.height = this.drawCanvas.getBoundingClientRect().height*2;
     
        // console.log('当前的宽高',this.canvas.width,this.canvas.height);
             //储存起来相应数组 备用
        gameInfo.sceneW = this.canvas.width;
        gameInfo.sceneH = this.canvas.height;
    }

    showA(){
        console.log('drawCanvas:',this.drawCanvas,'this.canvas:',this.canvas);
    }
    /**
     *阻止手机端的制动
     */
    preventDefault(){
        $(gameInfo.FindCanvas).on('touchmove',  event => {
            event.preventDefault();
        });
    }
    /**
     * 加载的是资源 放进去的是Set  这个是加载第一步
     * @param{Set} FileSet
     * @returns {Function} 返回的是加载完成回调函数
     */
    loadRes(FileSet,BACKfUN,updataBACKFun){
        let resMapL = 0;//数组中的长度
        for (let x of FileSet) {//遍历set
            // eslint-disable-next-line no-loop-func
            this.loadIamge(x[0],x[1],()=>{
                resMapL++;
                if(resMapL>=FileSet.size){
                    BACKfUN();
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
            let sprit_ = new Spirit(this.content,Iamge_,spriteKey+gameInfo.indexSpritiID);//创建精灵
            sprit_.position(positionX,positionY);
            gameInfo.showImageObjMap.set(spriteKey+gameInfo.indexSpritiID,sprit_);
            return sprit_;
        }
        //暂时不要删掉
        // if(gameInfo.allImageObjMap.has(spriteKey) === true){
        //     let sprit_ = gameInfo.allImageObjMap.get(spriteKey);
        //     sprit_.position(positionX,positionY);
        //     gameInfo.showImageObjMap.set(spriteKey,sprit_);
        //     return sprit_;
        // }

    }

    /**
     * 静态使用的创建方法
     * @param positionX
     * @param positionY
     * @param spriteKey
     * @returns {*}
     */
    static createSpriteS(positionX,positionY,spriteKey){
        if(gameInfo.allImageMap.has(spriteKey) === true){
            gameInfo.indexSpritiID++;//为了防止出现重复的key
            let Iamge_ = gameInfo.allImageMap.get(spriteKey);
            let sprit_ = new Spirit(gameInfo.content,Iamge_,spriteKey+gameInfo.indexSpritiID);//创建精灵
            sprit_.position(positionX,positionY);
            gameInfo.showImageObjMap.set(spriteKey+gameInfo.indexSpritiID,sprit_);
            return sprit_;
        }
 
    }

    /**
     * 遍历图片显示出来  然后调取帧动画进行渲染
     */
    drawRes(){
       
    
        this.content.clearRect(0,0,gameInfo.sceneW,gameInfo.sceneH);
        // this.drawContent.clearRect(0,0,gameInfo.sceneW,gameInfo.sceneH);
        for (let item  of gameInfo.showImageObjMap.entries()) {//所有的图片
            // console.log('当前的图片:',item[1]);
            item[1].drawResObj();
        }
        for (let item  of gameInfo.showFontObjMap.entries()) {//所有的字体
            item[1].drawResObj();
        }
        for (let item of gameInfo.eventFunMap.entries()) {//自定义的需要帧更新的
            item[1]();
        }
 
        // console.log('canvas:',this.canvas);
        this.drawContent.drawImage(this.canvas, 0, 0);
       
    }
    

    /**
     * 创建updata的振更新
     */
    updata(){
        console.log('开始真更新');
        //开始绘制

        gameInfo.self.drawRes();
        //重复调取
        window.requestAnimationFrame(this.updata);
    }

    //---------------字体的相关设置-------------------
    /**
     * 创建一个字体
     * @param{number} positionX
     * @param{number} positionY
     * @param{string} textKey
     * @returns{Text} {Text}
     */
    // eslint-disable-next-line consistent-return
    createFont(positionX,positionY,textKey){
        if(gameInfo.showFontObjMap.has(textKey) === false){
            let font_ = new Text(this.content,null);
            font_.position(positionX,positionY);
            gameInfo.showFontObjMap.set(textKey,font_);
            return font_;
        }
        this.waring(null,`使用createFont方法添加字体，已经存在了这个fontKsy: ${textKey}   请更换!`);
        
    }

    /**
     * 创建静态方法
     * @param positionX
     * @param positionY
     * @param textKey
     * @returns {Text}
     */
    static createFontS(positionX,positionY,textKey){
        if(gameInfo.showFontObjMap.has(textKey) === false){
            let font_ = new Text(gameInfo.content,null);//gameInfo.content使用的是这个   而不是this.context
            font_.position(positionX,positionY);
            gameInfo.showFontObjMap.set(textKey,font_);
            return font_;
        }
        this.waring(null,`使用createFont方法添加字体，已经存在了这个fontKsy: ${textKey}   请更换!`);

    }
    /**
     * 添加帧更新
     */
    static addUpdataFun(nameFun,fun){
        gameInfo.eventFunMap.set(nameFun,fun);


    }
    /**
     * 删除真更新
     */
    static deleteUpdataFun(nameFun){
        gameInfo.eventFunMap.delete(nameFun);
        // console.log('删除这个方法',fun,gameInfo.eventFun);
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
        new Error(gameInfo.waringLogo,text,content);

    }


    /**
     * 显示设备的相关参数
     */
    showCanvasWH(){
        this.showCanvasWH = this.createFont(180,50,'showCanvasWH');//创建一个字体
        this.showCanvasWH.fontContent('W:'+this.drawCanvas.getBoundingClientRect().width * 2+'  H:'+this.drawCanvas.getBoundingClientRect().height * 2+' drp:'+window.devicePixelRatio);//设置内容
        this.showCanvasWH.fontColor('#000000');////设置字体的颜色
        this.showCanvasWH.fontSize(26);//设置字体的大小
    }



 


}
