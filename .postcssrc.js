// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}

//移动端布局重新配置的
// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     "postcss-aspect-ratio-mini": {},
//     "postcss-write-svg": {
//       utf8: false
//     },
//     "postcss-cssnext": {},
//     "postcss-px-to-viewport": {
//       viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
//       viewportHeight: 1334,  //(Number) 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
//       unitPrecision: 3,  //(Number) 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
//       viewportUnit: 'vw',  //(String) 指定需要转换成的视窗单位，建议使用vw
//       selectorBlackList: ['.ignore', '.hairlines'],  //(Array) 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名.   //在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)：著作权归作者所有。
//       minPixelValue: 1,  //(Number) 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
//       mediaQuery: false  //(Boolean) 允许在媒体查询中转换`px`著作权归作者所有。
//     },
//     "postcss-viewport-units":{},
//     "cssnano": {
//       preset: "advanced",
//       autoprefixer: false,
//       "postcss-zindex": false  //只要启用了这个插件，z-index的值就会重置为1。这是一个天坑，千万记得将postcss-zindex设置为false。著作权归作者所有。
//     }
//   }
// }
