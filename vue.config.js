const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: '/',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/easyrecord-vue-website/'
  //   : '/',
  lintOnSave: false,
  chainWebpack: config => {

    // config.plugins.delete('prefetch')

    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() //只包含icons目录
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(options => ({ ...options, plugins: [] })) //{ removeAttrs: { attrs: 'fill' } }去除颜色
      .end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) // 其他svg loader 排除 dir 目录
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
    }
  }
}
