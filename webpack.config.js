const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//webpack中的所有的配置信息都应该写在module.exports 中
module.exports = {
    mode: 'development', // 设置mode
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        //打包后文件的名字
        filename:'bundle.js',
        environment: {
            //告诉webpack不使用箭头函数
            arrowFunction: false
        }
    },
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test:/\.ts$/,
                //要使用的loader
                use:[
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        //设置babel
                        options: {
                            //设置预定义的环境
                            presets:[
                                //指定环境的插件
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        targets:{
                                            "chrome":'58',
                                            "ie":11
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                        //使用corejs的方法"usage"表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                //要排除的文件
                exclude: /node_modules/
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }

                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    //配置webpack插件
    plugins: [
        //每次重新生成打包后的文件夹
        new CleanWebpackPlugin(),
        //自动生成html文件
        new HTMLWebpackPlugin({
            //在生成的网页根据模板生成
            template: "./src/index.html"
        }),

    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts','.js']
    }
}