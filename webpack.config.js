const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const uglify = require('uglifyjs-webpack-plugin'); //js压缩插件
const path = require('path');

module.exports = {
    entry:'./src/index.js',
    output: {
      filename: 'index.js',
      path: __dirname + '/dist',
      // publicPath:'./src/'
    },
    plugins:[ 
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './src/index.html', // 配置文件模板
        }), 
        
        new CleanWebpackPlugin(),
        new uglify(
          // {//js压缩插件
          // cache: false,//启用文件缓存
          // parallel: true,//使用多进程并行运行来提高构建速度
          // sourcMap: true//使用源映射将错误消息位置映射到模块（这会减慢编译速度）
          // }
        ),
      //   new CopyWebpackPlugin([
      //     {
      //       from: './src/images',
      //       to: './images',
      //       ignore: ['.*']
      //     }
      // ])
    ],
    module: {
      rules: [
        // 对css的解析
        {
          test: /\.css/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          use: [
            'style-loader',
            'css-loader',
          ],
        }, 
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              // loader: 'file-loader',
              loader: 'url-loader?limit=1024&name=./images/[name].[ext]'//这个会把你打出来的包 放在dist的image下面
            },
          ],
        },
        {test: /\.js$/,exclude: /(node_modules)/,use: "babel-loader"},
     // HTML中的图片
    //  {
    //   test: /\.(htm|html)$/i,
    //   use: ['html-withimg-loader']
    // },
      ],
       
    },
    // resolve:{
    //   alias:{
    //     images: path.resolve(__dirname, 'src/images')
    //   }
    // },
    devServer: {
      //设置基本结构
      // contentBase: path.resolve(__dirname, './dist'),
      contentBase: path.resolve(__dirname, './src/'),//这个很关键他是决定打开文件之后从那个页面座位主页面
      host: 'localhost',//服务器IP地址,可以是localhost
      compress: true,//服务端压缩是否开启
      open: true,// 自动打开浏览器
      hot: true ,// 开启热更新 
    }

}
