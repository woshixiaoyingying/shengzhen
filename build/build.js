'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
var shell = require('shelljs')
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    //将生成的文件复制进入widget，处理Dcloud 打包问题
    function cpStaticToWidget(){
      var bb = ora('正在复制处理到hztWidget文件夹...').start()
      var cppath = path.resolve(__dirname, '../hztWidget')
      rm(path.join(cppath, 'static'), err => {
        if (err) throw console.warn(err)
        shell.cp('-Rf', path.join(config.build.assetsRoot, '/*'), cppath);
        console.log(chalk.cyan('复制到hztWidget完成'))
        bb.stop()
        cpWidgetToXcode()
      })
    }

     //将生成的widget文件复制进入xcode，处理xcode打包问题
    function cpWidgetToXcode(){
      var xcodeBb = ora('正在复制处理到xcode项目文件夹...').start()
      var xcodeCppath = path.resolve(__dirname, '../hztXcodeProject/hztXcodeProject/Pandora/apps/H59A82BDC/www/')
      rm(path.join(xcodeCppath, 'hztWidget'), err => {
        if (err) throw console.warn(err)
        shell.cp('-Rf', path.join(path.join(__dirname, '../hztWidget'), '/*'), xcodeCppath);
        console.log(chalk.cyan('复制到xcodeProject完成'))
        xcodeBb.stop()
        
      })
    }
    
    cpStaticToWidget()

  })
})
