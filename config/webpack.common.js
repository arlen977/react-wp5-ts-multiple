/* eslint-disable */
// webpack 公共配置
const path = require("path");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const setMap = require("./mpa")
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcPath = path.join(__dirname, '..', 'src'); // src 目录路径

// css/css module 正则表达式
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
// sass/sass module 正则表达式
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// less/less module 正则表达式
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
// stylus/stylus module 正则表达式
const stylRegex = /\.styl$/;
const stylModuleRegex = /\.module\.styl$/;

const APP_ENV = process.env.APP_ENV; // 当前开发区分执行环境，该变量会有多个值
const APP_NODE_ENV = process.env.APP_NODE_ENV; // 当前编译环境变量，该变量只有development或者production

const isEnvDevelopment = APP_NODE_ENV === 'development';
const isEnvProduction = APP_NODE_ENV === 'production';

module.exports = (env) => {


    // 根据环境区分加载对应样式loader
    const getStyleLoaders = (cssOptions, preProcessor, more = []) => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'), //style-loader与MiniCssExtractPlugin冲突，所以需要区分加载
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
            }
        ].filter(Boolean);
        return loaders
    }
    return {
        entry: setMap().entry,
        plugins: [
            // 加载对应的环境变量文件
            new Dotenv({
                path: path.join(__dirname, `../.env.${APP_ENV}`),
                systemvars: true,
            }),
            // 生成 index.html
            ...setMap().htmlwebpackplugins,
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
            },
            extensions: ['.tsx', '.ts', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)?$/,
                    use: ["babel-loader"],
                    include: srcPath,
                },
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: [...getStyleLoaders(), "css-loader", "postcss-loader"].filter(Boolean)
                },
                {
                    test: cssModuleRegex,
                    use: [
                        ...getStyleLoaders(),
                        {
                            loader: "css-loader",
                            options: {
                                module: {
                                    getLocalIdent: getCSSModuleLocalIdent,
                                }
                            }
                        },
                        "postcss-loader"
                    ]
                },
                {
                    test: sassRegex,
                    exclude: sassModuleRegex,
                    use: [...getStyleLoaders(), "css-loader", "postcss-loader", "sass-loader"]
                },
                {
                    test: sassModuleRegex,
                    use: [
                        ...getStyleLoaders(),
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent,
                                }
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: stylRegex,
                    exclude: stylModuleRegex,
                    use: [...getStyleLoaders(), "css-loader", "postcss-loader", "stylus-loader"]
                },
                {
                    test: stylModuleRegex,
                    use: [
                        ...getStyleLoaders(),
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent,
                                }
                            }
                        },
                        "postcss-loader",
                        "stylus-loader"
                    ]
                },
                {
                    test: lessRegex,
                    exclude: lessModuleRegex,
                    use: [...getStyleLoaders(), "css-loader", "postcss-loader", "less-loader"],
                    sideEffects: true,
                },
                {
                    test: lessModuleRegex,
                    use: [
                        ...getStyleLoaders(),
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    getLocalIdent: getCSSModuleLocalIdent,
                                }
                            }
                        },
                        "postcss-loader",
                        "less-loader"
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            ]
        },
    }
}