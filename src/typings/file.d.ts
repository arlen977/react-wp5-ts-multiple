/* eslint-disable */
// 声明类型文件，解决使用ts 无法正常引入css文件或其他包文件问题
declare module "*.css" {
    const style: any;
    export default style
}

declare module "*.scss" {
    const style: any;
    export default style
}

declare module "*.less" {
    const style: any;
    export default style
}

