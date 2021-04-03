'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const serverpath = 'http://127.0.0.1:9527'

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/Login': {
        target: 'http://localhost:9158',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/Login': '/oauth/token' 
        }
      },
      '/Logout': {
        target: 'http://localhost:9158',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/Logout': '/oauth/Logout' 
        }
      },
      '/Getusrmsg': {
        target: 'http://localhost:9158',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/Getusrmsg': '/oauth/check_token' 
        }
      },
      '/MachineList': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/MachineList': '/AWM/PROVIDERMACHINE/queryAllMachine' 
        }
      },
      '/UserList': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/UserList': '/AWM/PROVIDERUSER/findallUser' 
        }
      },
      '/OrderList': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/OrderList': '/AWM/PROVIDERORDER/allOrder' 
        }
      },
      '/CountUser': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/CountUser': '/AWM/PROVIDERUSER/countuser' 
        }
      },
      '/CountOrder': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/CountOrder': '/AWM/PROVIDERORDER/countorder' 
        }
      },
      '/CountMachine': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/CountMachine': '/AWM/PROVIDERMACHINE/countmachine' 
        }
      },
      '/QRcode': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/QRcode': '/AWM/PROVIDERMACHINE/machineQRcode' 
        }
      },
      '/NewMachine': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/NewMachine': '/AWM/PROVIDERMACHINE/creatnewMachine' 
        }
      },
      '/QueryMachine': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/QueryMachine': '/AWM/PROVIDERMACHINE/queryMachine' 
        }
      },
      '/PseudodeleteMachine': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/PseudodeleteMachine': '/AWM/PROVIDERMACHINE/PseudodeleteMachine' 
        }
      },
      '/StatisticalHour': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/StatisticalHour': '/AWM/PROVIDERORDER/statisticalhour' 
        }
      },
      '/StatisticalWeek': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/StatisticalWeek': '/AWM/PROVIDERORDER/statisticalweek' 
        }
      },
      '/StatisticalSaleRoom': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/StatisticalSaleRoom': '/AWM/PROVIDERORDER/statisticalsaleroom' 
        }
      },
      '/Position': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/Position': '/AWM/PROVIDERMACHINE/position' 
        }
      },
      '/MachinerecycleBin': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/MachinerecycleBin': '/AWM/PROVIDERMACHINE/machinerecyclebin' 
        }
      },
      '/PseudodeleteListMachine': {
        target: serverpath,  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          '^/PseudodeleteListMachine': '/AWM/PROVIDERMACHINE/PseudodeletelistMachine' 
        }
      }
      
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8100, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

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
  }
}
