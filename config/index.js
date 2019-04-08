
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static', //静态资源存放位置
    // assetsPublicPath: '/',     //以前是这个
    assetsPublicPath: './',
    // productionSourceMap: true,  //为了打包时不生成.map文件所以改成false   .map文件会把报错信息映射到源文件
    productionSourceMap: false,

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off      
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    // port: process.env.PORT || 8080,
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable:  {
      // '/': {
      //   target: 'http://ceshiapi.aifengji178.com',
      //   changeOrigin: true
      // },
      //   '/api': {
      //   target: 'http://ceshi.aifengji178.com',  //目标接口域名
      //   changeOrigin: true,  //是否跨域
      //   pathRewrite: {
      //     '^/api': ''   //重写接口
      //   }
      // },

      //open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/wanghao/Documents/MyChromeDevUserData
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    //显示css位置的
    cssSourceMap: true
  }
}
