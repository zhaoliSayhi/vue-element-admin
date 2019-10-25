const path = require('path');
const defaultSettings = require('./src/settings.js')

const resolve = dir => {
  return path.join(__dirname, dir)
};

const name = defaultSettings.title || 'vue Element Admin' // page title

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,

  configureWebpack: {
    name,
    resolve: {
      extensions: ['.js', '.vue', '.html',".less", ".css", 'png', 'jpg'],
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components'),
      }
    }
  },

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  },

  // devServer: {
  //   // proxy: 'http://localhost:9014/'
  //   proxy: {
  //     '^/api': {
  //       target: ''
  //     }
  //   },
  // },
};

function addStyleResource(rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, 'src/common/css/*.less'),
        ],
      });
}
