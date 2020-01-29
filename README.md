# 使用
记得下载下来的第一件事就是 npm install

>本地运行
>>npm run dev

>测试服
>>pm run build:d

>正式服
>>pm run build:p

csdn地址: https://blog.csdn.net/huhudeni/article/details/104090288

# 只想使用以及极其简单的webpack
  > 建工程下载下来后 在src/index.js脚本内容清空  同时将下面这句话赋值粘贴放在src/index.js脚本里面
  >> import "./index.css"; 
  
  >如果你想使用zepto 及其动画 就是再加上下面的引用
  >> `import $ from 'zepto-webpack'`
  >> `import "./js/zeptoFx.js"`



# canvasWF
## 话语
>这是一个人个人的项目，想让cnavas的使用标签一样便捷。这最终的目的，前期会考虑使用想cocosCreator与unity一样的组件化开发（实际上已经开发了大半了，整理后慢慢放出来，但是目前使用的是phaser,相似的加载方式），但是他的功能会比较基础.
希望使用canvas做出的简单的互动，就像跟使用标签一样频繁。后期也可能会加入webGL的相关的功能，尽可能的让你的网页看起来更加的丰富多彩，
或者使用更加适合于网页调取，而不是专门的游戏的引擎，因为毕竟已经有很多优秀的游戏引擎与资源加载器。这样包体会变小，增加开屏的速度。可能5G的到来就不在侧重于大小。但是依旧希望它能够帮你在你的网页效果的制作上
前期会上传基本的脚本组件与使用的实例。

>也会有可能向着互动页面  互动活动的方向去

>我最终开始将这个canvasWF的定位在了互动页面方向。同时也开始了组件的开发方式。会存在DOTween Button ParticleEffect Collision(未完成) 也在思考要不要将Image 与Text 也封装起来。好处是开发逻辑非常清晰。有利于之后的组件扩展。不好的是页面的互动。过于组件话会导致开发啰嗦与重复，框架的目的是尽可能帮助减少开发时间，这样就有些违背目的了。
>当前这个里面目前并不存在创景的概念，如果你想时间多场景的，可以将资源装进数组中，或者Group中，从而统一对场景进行处理

### 2019/10/10
>之前的是集成在vue上面的，感觉这样并不太好用，所以我就把他重新继承在webpack上,不过我仅仅添加了js的plugin插件的使用。我在后面的开发的时候会继续添加对html与图片压缩的组件，包括其他的webpack的其他的plugin及其loader的添加

### 2019/10/12
>canvas
>>1-提升渲染的效率 添加了离屏cnavas
>>2-同时剔除canvasWF对zepto的依赖

>webpack
>>1-增加webpack对scss的支持  --方便接下来的编写案例页面使用

### 2020/01/25（大年初一 晚01：45）
>终于在过年假的时候，有时间去思考如何封装DOTween的组件，我主要是参考了unity中的DOTween的代码书写格式与coocsCreate中的动画循环类型，同时button也封装了起来。
>DOTween
>>1-DOTween组件封装完成。主要是单轴x,单轴y,坐标xy的移动封装 scale的间歇动画会在下一个版本更新上放出来
>Button
>>2-同时将button功能提出封装成为Button组件。参考unity 但是

### 2020/01/26 （大年初二 晚11.55）
>今天将scale的动画更新了上来，但是字体在放大缩小的时候，只能通过Top Bottom Middle Alphabetic Hanging的原生方法对字体的上下锚点进行控制。 我并没有给Text添加自定义的锚点的设置，突然有了处理的办法了。我会在后期更新添加上，这样字体的缩放就不会存在问题了
>scale
>>1-DOTween添加scale的动画支持
>优化
>>2-将DOTween中的代码进行优化。

### 2020/01/27
>今天主要是把Collision碰撞组件封装起来。 
>>将Collision组件等装好，目前提供的是三种方法的回调 初次碰撞 物体重叠 碰撞结束

### 2020/01/38
>优化Game脚本中的代码