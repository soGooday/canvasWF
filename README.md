# 使用
记得下载下来的第一件事就是 npm install

# 只想使用以及极其简单的webpack
  > 建工程下载下来后 在src/index.js中 删除 后载src下重新创建一个index.js 同时将下面的赋值粘贴放在这个idnex.js里面
  
  >> import "./index.css"; 
  
  >如果你想使用zepto 及其动画 就是再加上下面的引用
  >> `import $ from 'zepto-webpack'`
  >> `import "./js/zeptoFx.js"`

# canvasWJ
## 话语
这是一个人个人的项目，想让cnavas的使用标签一样便捷。这最终的目的，前期会考虑使用想cocosCreator与unity一样的组件化开发（实际上已经开发了大半了，整理后慢慢放出来，但是目前使用的是phaser,相似的加载方式），但是他的功能会比较基础.
希望使用canvas做出的简单的互动，就像跟使用标签一样频繁。后期也可能会加入webGL的相关的功能，尽可能的让你的网页看起来更加的丰富多彩，
或者使用更加适合于网页调取，而不是专门的游戏的引擎，因为毕竟游戏引擎有些大,同时已经拥有了很多游戏的js游戏引擎。可能5G的到来就不在侧重于大小。但是依旧希望它能够帮你在你的网页效果的制作上
前期会上传基本的脚本组件 与使用的实例。

也会有可能向着互动页面  互动活动的方向去

### 2019/10/10
>之前的是集成在vue上面的，感觉这样并不太好用，所以我就把他重新继承在webpack上,不过我仅仅添加了js的plugin插件的使用。我在后面的开发的时候会继续添加对html与图片压缩的组件，包括其他的webpack的其他的plugin及其loader的添加
### 2019/10/12
>提升渲染的效率 添加了离屏cnavas
