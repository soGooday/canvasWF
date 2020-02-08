import {Behaviour} from './Behaviour';
import {Game, gameInfo} from './Game';

export class Text extends Behaviour{
    constructor(context,text,ID) {
        super()
      
        this.TypeName = 'Text';//物体类名字型
        this.remscale = window.remscale;//缩放的大小参数 
        this.objectID = ID; //基础的id
        
      
        this.context = context;
        this.x = 0;//x的位置
        this.y = 0; //Y的位置
        this.scaleW=1;//对canvas的放大缩小width
        this.scaleH=1;//对canvas的方法缩小x:this.scaleW,height
        this.scale={//暂时并未使用
            x:1,
            y:1,
        }
        this.alpha = 1;//精灵的透明度
        this.rotate = 0;//旋转的角度
        this.alphaNum = 1;//默认是1
        this.activeState = true;//是否显示的状态
        this.color = { //默认是不透明的白色
            r: 255,
            g: 255,
            b: 255,
            a: 255,
        },
        this.anchor={
            x:0.5,
            y:0.5,
        } 
        //初始化本游戏体相关的参数
        this.initData(context,text,ID)


        return this;  
    }
    initData(context,text,ID){
        //本组件的相关参数的设置
        this.fontSizeNumder = 20//默认设置字号的大小
        this.fontSize(this.fontSizeNumder);//字体的大小 
        this.fontTextAlign('center') ;//设置字体的水平模式
        this.fontTextBaseline('middle');//设置字体的垂直模式
        this.fontContent(text);//默认表示ID就是文字的内容 
        this.fontColor('#FFFFFF');///字体的颜色 默认白色 
        this.fontStyle('normal');//字体的倾斜 加粗 正常 默认正常 
    }

    /**
     * 隐藏或者显示字体
     * @param{boolean} state
     * @param{string} spritKey
     */
    setActive(state){
        if(state === true){
            this.activeState = state;
        }else if(state === false){
            this.activeState = state;
        }
    }

    /**
     * 设置字体在canvas上的大小
     * @param{number} scaleX
     * @param{number} scaleY
     */
    setScale(scaleX,scaleY){
        this.scaleW = scaleX;
        this.scaleH = scaleY;
        return this;
    }

    /**
     * 确定这个text的锚点在哪里 现在只适用于非坐标的锚点设置（放大缩小，旋转是可以的） 移动的锚点正在添加ing
     * @param{number} anchorX 左边->右边（0-1）传进来的是小数
     * @param{number} anchorY 上边->下边（0-1）传进来的是小数
     */
    setAnchor(x,y){
        (this.anchor={x,y});
        return this;
    }

    /**
     * 设置精灵的透明度
     * @param{number} num 范围 0-1
     */
    setAlpha(num){
        this.alpha = num;
        return this;
    }

    /**
     * 内容是什么
     * @param{string} content
     */
    fontContent(content){
        this.text = content;
        return this;
    }

    /**
     * 设置字体的大小
     * @param{number} num
     */
    fontSize(num){
        if(typeof(num) === 'number'){
            this.fontSizeNum = Math.abs(parseInt(num)* window.remscale).toString()+'px';
            this.fontSizeNumder = num;
        }else {
            new Error('请传入数字类型，你传入的是',typeof num,'类型');
        }
        return this;
    }

    /**
     * 得到字体色号的大小
     * @returns {number}
     */
    getFontSize(){
        return this.fontSizeNumder;
    }

    /**
     * 设置字体的水平模式
     * @param{start,end,left,center,right} type
     *
     */
    fontTextAlign(type = 'center'){
        if (!(type === 'start' || type === 'end' || type === 'left' || type === 'center' || type === 'right')) {
            new Error('字体水平模式的设置只使用 start end left center right 中的任何一个，不可自定义 ');
        } else {
            this.fontTextAlignType = type;
        }
        return this;
    }

    /**
     * 设置字体的垂直模式
     * @param{top,bottom,middle,alphabetic,hanging } type
     *
     */
    fontTextBaseline(type = 'middle'){
        if (!(type === 'top' || type === 'bottom' || type === 'middle' || type === 'alphabetic' || type === 'hanging')) {
            new Error('字体水平模式的设置只使用 top bottom middle alphabetic hanging 中的任何一个，不可自定义 ');
        } else {
            this.fontTextBaselineType = type;
        }
        return this;
    }

    /**
     * 字体的坐标
     * @param{string} positionX
     * @param{string} positionY
     */
    setPosition(positionX,positionY) {
        this.x = positionX;//x的位置
        this.y = positionY;  //Y的位置
        return this;  
    }
    /**
     * 设置字体颜色的参数
     * @param{string} colorNum
     */
    fontColor(colorNum){
        if(typeof(colorNum) === 'string'){
            this.colorNum =colorNum; 

        }
        return this;
    }

    /**
     * 字体的类型
     * @param{normal,bold,italic} style
     *
     */
    fontStyle(style){
        if(!(style ==='normal' ||  style ==='bold' ||style ==='italic')){
            this.fontStyleContent =style;
        }else {
            new Error('只可填入 normal bold italic 其中的一种')
        }
        return this;
    }

    /**
     * 取到坐标
     */
    getPosition(){
        let positionInfo={
            x:this.x,
            y:this.y,
        }
        return positionInfo;
    }

    /**
     * 销毁游戏体
     */
    destroy(){
        Game.deleteObj(this.objectID);
    }

    /**
     * 销毁游戏体
     */
    remvoe(){
    this.destroy();
    } 

    drawResObj(){
        if(this.activeState === false){
            return;
        }
        //下面备注掉的是本想给字体添加锚点的设置 又因为原生提供的垂直与行的原生方法，能够实现基本的需求，于是便没有封装。如果你看到这个注释，你需要需要哦这个需求
        //我的思路是，将我上面封装的关于横向与纵向的模式改成坐标的位置从而实现，放弃原生的API--fontTextBaselineType与fontTextAlignType 我下面的注释已经帮助你完成
        //你需要知道的关于字体的宽与高的方法 
        //字体的宽 this.context.measureText(this.text).width
        //字体的高 this.fontSizeNumder
        let translateX = this.x*window.remscale;
        let translateY = this.y*window.remscale;
        this.context.save();  
        this.context.translate(translateX,translateY); 
        this.context.globalAlpha = this.alphaNum;//透明度
        this.context.fillStyle = this.colorNum;//字体颜色
        this.context.font = this.fontSizeNum  +' '+ this.fontStyleContent +' '+'黑体';
        this.context.textAlign = this.fontTextAlignType;// 设置水平对齐方式
        this.context.textBaseline = this.fontTextBaselineType; // 设置垂直对齐方式
        this.context.scale(this.scaleW,this.scaleH);//方法缩小
        this.context.translate(-translateX,-translateY); 
        this.context.fillText(this.text, translateX, translateY);
        this.context.restore();
    }

   

}