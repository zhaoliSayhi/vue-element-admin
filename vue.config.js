const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir)
};

module.exports = {
  // 打包路径
  publicPath: './',

  // 是否开启eslint
  lintOnSave: false,

  // 打包时不生成.map文件
  productionSourceMap: false,

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 75
          })
        ],
      },
      less: {
        javascriptEnabled: true
      }
    }
  },

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },

  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.html',".less", ".css", 'png', 'jpg'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'components': resolve('src/components'),
        'common': resolve('src/common'),
        'pages': resolve('src/pages'),
        'assets': resolve('src/assets'),
        'base': resolve('src/base'),
        'api': resolve('src/api'),
        'views': resolve('src/views'),
      }
    }
  },

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，本地开发环境的axios的baseUrl要写为 ''
  devServer: {
    // proxy: 'http://localhost:9014/'
    proxy: {
      '^/api': {
        target: 'http://3.113.0.125:8011/',
        ws: false,
      },
      '^/json': {
        target: 'http://3.113.0.125:8011/',
      },
      '^/deepfile': {
        target: 'http://47.244.178.133:8092/'
      },
      // '/': {
      //   target: 'http://localhost:9014/'
      // }
    },
  },
};

function addStyleResource(rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, 'src/common/css/*.less'),
        ],
      })
}
