// 多页面 入口or插件 配置 
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const glob = require("glob")
const cdnConfig = require("./cdn")
const externalConfig = JSON.parse(JSON.stringify(cdnConfig.externalConfig));  // 读取配置
cdnConfig.getExternalModules(externalConfig); // 获取到合适的路径（引用类型，自动改变）

const setMpa = () => {
    const entry = {};
    const htmlwebpackplugins = [];

    const entryFiles = glob.sync(path.join(__dirname, "..","src/pages/*/index.tsx"));
    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/pages\/(.*)\/index\.tsx$/);
        const pageName = match[1];
        entry[pageName] = entryFile;
        htmlwebpackplugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "..",`src/pages/${pageName}/index.html`),
                filename: `${pageName}/index.html`,
                chunks: [pageName], //表示：只会把这个chunk的信息添加到这段html中
                cdnConfig: externalConfig,
                // onlyCss: false, //加载css
            })
        );
    });
    return {
        entry,
        htmlwebpackplugins,
    };
};
module.exports = setMpa;